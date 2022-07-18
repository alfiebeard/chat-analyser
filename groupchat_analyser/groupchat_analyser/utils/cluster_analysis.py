from numpy.core.numeric import full
from sklearn.cluster import DBSCAN
import numpy as np


def cluster_by_time(df):
    # Get all times in array.
    all_times = df['datetime'].tolist()
    
    cluster_list = segment_data(all_times)
    return add_clusters(df, cluster_list)


# Segment a list of times into groups, each separated once max_gap_size is hit.
# E.g., [10, 500, 780, 3000, 7000, 7500] -> [0, 0, 0, 0, 1, 1], since first 4 are in the same cluster.
def segment_data(x, max_gap_size=3600):
    breakpoints = []
    for i in range(len(x) - 1):
        # Get gap between this point and next
        if abs(x[i + 1] - x[i]).seconds > max_gap_size:
            # Save breakpoint of x
            breakpoints.append(i + 1)
        i += 1

    cluster_list = []
    breakpoint_id = 0
    breakpoints_len = len(breakpoints)
    for i in range(len(x) - 1):
        # If been through all breakpoints - add remaining points and break
        if breakpoint_id == breakpoints_len:
            for _ in range(i, len(x)):
                cluster_list.append(breakpoint_id)
            break
        # Otherwise check if breakpoint matches and index by 1.
        if breakpoints[breakpoint_id] == i:
            breakpoint_id += 1
        cluster_list.append(breakpoint_id)

    return cluster_list


def add_clusters(df, cluster_list):
    return df.assign(cluster_id=cluster_list)


def conversation_lengths(df):
    return df.groupby('cluster_id').size().sort_values(ascending=False)