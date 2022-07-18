import pandas as pd
import numpy as np


def df_to_dict(df):
    return df.to_dict(orient='dict')


def df_from_dict(df_dict):
    return pd.DataFrame.from_dict(df_dict)


def nan_to_null(df):
    return df.fillna(np.nan).replace([np.nan], [None])