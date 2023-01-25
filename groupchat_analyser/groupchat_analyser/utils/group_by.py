import pandas as pd


def group_over_time(df, column, interval, aggregation="count", split_by_users=False):
    df = df.copy()
    interval_options = {"daily": "Day", "monthly": "Month", "annual": "Year"}

    df_columns = ['datetime', column]
    
    if interval == "daily":
        group_by = [pd.Grouper(key='datetime', axis=0, freq='D')]
        str_time_format = '%d %b %y'
    elif interval == "monthly":
        group_by = [pd.Grouper(key='datetime', axis=0, freq='M')]
        str_time_format = '%b %y'
    elif interval == "annual":
        group_by = [pd.Grouper(key='datetime', axis=0, freq='Y')]
        str_time_format = '%Y'

    if split_by_users:
        df.sender_name = pd.Categorical(df.sender_name)   # Don't want to have missing sender names for some intervals.
        group_by.append("sender_name")
        df_columns.append("sender_name")

    if aggregation == "count":
        grouped_by_interval = df[df_columns].groupby(group_by).count()
    elif aggregation == "sum":
        grouped_by_interval = df[df_columns].groupby(group_by).sum()
    elif aggregation == "mean":
        grouped_by_interval = df[df_columns].groupby(group_by).mean()
        grouped_by_interval = grouped_by_interval.fillna(0)   # Fill N/A's with 0's - as no data, so no mean.

    if split_by_users:
        grouped_by_interval.index = grouped_by_interval.index.set_levels([grouped_by_interval.index.levels[0].strftime(str_time_format), grouped_by_interval.index.levels[1]])
        grouped_by_interval = grouped_by_interval.swaplevel()
        grouped_by_interval['datetime'] = grouped_by_interval.index.get_level_values(1)
        data = grouped_by_interval.groupby(level=0).apply(lambda df: df.xs(df.name).to_dict('list')).to_dict()
    else:
        grouped_by_interval.index = grouped_by_interval.index.strftime(str_time_format)
        grouped_by_interval['datetime'] = grouped_by_interval.index
        data = grouped_by_interval.to_dict('list')

    metadata = {"x_scale": interval, "x_scale_options": interval_options}
    grouped_by_interval_dict = {"data": data, "metadata": metadata}

    return grouped_by_interval_dict


def get_over_time_interval(interval, total_time):
    if interval == "auto":
        if total_time.days < 30:
            # Daily if there is less than 30 days of data
            interval = "daily"
        elif total_time.days < 30 * 30:
            # Monthly if there is less than 30 months of data
            interval = "monthly"
        else:
            interval = "annual"
    elif interval == "heatmap":
        if total_time.days < 240:
            # Daily if there is less than 240 days of data
            interval = "daily"
        elif total_time.days < 240 * 30:
            # Monthly if there is less than 240 months of data
            interval = "monthly"
        else:
            interval = "annual"
    
    return interval


def group_by_period(df, column, period, aggregation="count", split_by_users=False):
    period_options = {"hour": "Hour", "day": "Day", "month": "Month"}

    df_columns = [column, 'period']
    group_by = ['period']

    if period == "hour":
        # Hour of the day
        str_time_format = '%H'
        df['period'] = df['datetime'].dt.strftime(str_time_format)
        df['period'] = df['period'] + ":00"
    elif period == "day":
        # Day of week
        str_time_format = '%A'
        period_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        df['period'] = df['datetime'].dt.strftime(str_time_format)
        df.period = pd.Categorical(df.period, categories=period_order, ordered=True)
    elif period == "month":
        # Month of year
        str_time_format = '%b'
        period_order = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        df['period'] = df['datetime'].dt.strftime(str_time_format)
        df.period = pd.Categorical(df.period, categories=period_order, ordered=True)
    elif period == "minute":
        # Minute of the day
        str_time_format = '%H:%M'
        df['period'] = df['datetime'].dt.strftime(str_time_format)
        df['period'] = df['period']

    # TODO: average mode, which computes the average per hour, day, month.

    if split_by_users:
        df.sender_name = pd.Categorical(df.sender_name)   # Don't want to have missing sender names for some intervals.
        group_by.append("sender_name")
        df_columns.append("sender_name")

    if aggregation == "count":
        grouped_by_interval = df[df_columns].groupby(group_by).count()
    elif aggregation == "sum":
        grouped_by_interval = df[df_columns].groupby(group_by).sum()
    elif aggregation == "mean":
        grouped_by_interval = df[df_columns].groupby(group_by).mean()
        grouped_by_interval = grouped_by_interval.fillna(0)   # Fill N/A's with 0's - as no data, so no mean.

    if split_by_users:
        grouped_by_interval = grouped_by_interval.swaplevel()
        grouped_by_interval['datetime'] = grouped_by_interval.index.get_level_values(1)
        data = grouped_by_interval.groupby(level=0).apply(lambda df: df.xs(df.name).to_dict('list')).to_dict()
    else:
        grouped_by_interval['datetime'] = grouped_by_interval.index
        data = grouped_by_interval.to_dict('list')

    metadata = {"x_scale": period, "x_scale_options": period_options}
    grouped_by_interval_dict = {"data": data, "metadata": metadata}

    return grouped_by_interval_dict


def get_period(period):
    if period == "auto":
        period = "hour"
    return period


