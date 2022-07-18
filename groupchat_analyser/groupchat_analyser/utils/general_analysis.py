from datetime import timedelta


def total_messages(df):
    return df.shape[0]


def total_time(df):
    return max(df['datetime']) - min(df['datetime'])


def nth_message(df, n):
    return df.iloc[n]


def filter_by_date(df, start_date, end_date):
    if start_date and end_date:
        return df[(df['datetime'] >= start_date) & (df['datetime'] <= end_date)]
    elif start_date:
        return df[(df['datetime'] >= start_date)]
    elif end_date:
        return df[(df['datetime'] <= end_date)]
    else:
        return df


def filter_by_days(df, date, days, prior=True):
    # Prior indicates whether in the prior days, e.g., n days before date. 
    # If it's false it indicate n days after date.
    if prior:
        date_filter = date - timedelta(days=days)
        return df[(df['datetime'] > date_filter) & (df['datetime'] <= date)]
    else:
        date_filter = date + timedelta(days=days)
        return df[(df['datetime'] < date_filter) & (df['datetime'] >= date)]


def silences(df):
    silences_df = df.copy(deep=True)

    # Drop all but the following columns and rename
    silences_df = silences_df[["datetime", "content", "photos", "videos", "sender_name", "timestamp_ms"]]
    silences_df.rename(columns={"datetime": "datetime_start", "content": "content_start", 
        "photos": "photos_start", "videos": "videos_start", "sender_name": "sender_name_start", 
        "timestamp_ms": "timestamp_ms_start"},
        inplace=True
    )

    # Shift columns to keep
    silences_df['datetime_end'] = silences_df.loc[:, 'datetime_start'].shift(-1)
    silences_df['content_end'] = silences_df.loc[:, 'content_start'].shift(-1)
    silences_df['photos_end'] = silences_df.loc[:, 'photos_start'].shift(-1)
    silences_df['videos_end'] = silences_df.loc[:, 'videos_start'].shift(-1)
    silences_df['sender_name_end'] = silences_df.loc[:, 'sender_name_start'].shift(-1)
    silences_df['timestamp_ms_end'] = silences_df.loc[:, 'timestamp_ms_start'].shift(-1)

    # Calcualte time difference between columns
    silences_df['time_diff'] = abs(silences_df['datetime_end'] - silences_df['datetime_start'])

    return silences_df.sort_values(by=['time_diff'], ascending=False)
