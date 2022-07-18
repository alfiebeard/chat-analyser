import pandas as pd


def add_date_info(df):
    df['datetime'] = pd.to_datetime(df['timestamp_ms'], unit='ms')
    # df['date'] = pd.to_datetime(df['datetime']).dt.date
    return df


def merge_by_user(df, to_name, from_name):
    if isinstance(from_name, list):
        for from_name_ in from_name:
            df['sender_name'] = df['sender_name'].str.replace(from_name_, to_name)
    else:
        df['sender_name'] = df['sender_name'].str.replace(from_name_, to_name)
