import pandas as pd
import copy
from werkzeug.datastructures import ImmutableMultiDict
from groupchat_analyser.utils.load_data import load_message_data, load_messages
from groupchat_analyser.utils.cluster_analysis import cluster_by_time, conversation_lengths
from groupchat_analyser.utils.general_analysis import *
from groupchat_analyser.utils.user_analysis import *
from groupchat_analyser.utils.text_analysis import message_length, word_mentions, phrase_mentions, most_used_words, all_words


class Groupchat:
    def __init__(self, data):
        if data is None:
            return "Must enter filepath"
        elif isinstance(data, ImmutableMultiDict):
            # If array of files - load_data
            self.df, self.users, self.name, self.image = load_messages(data)
        elif isinstance(data, str):
            # If filepath load data
            self.df, self.users, self.name, self.image = load_message_data(data)
            self.df = cluster_by_time(self.df)
        elif isinstance(data, dict):
            # If session data in dict - parse
            self.df = pd.DataFrame.from_dict(data["df"])
            self.users = data["users"]
            self.name = data["name"]
            self.image = data["image"]

        self.total_messages = total_messages(self.df)
        self.start_date = min(self.df['datetime'])
        self.end_date = max(self.df['datetime'])
        self.total_time = self.end_date - self.start_date


    def to_dict(self):
        return {
            "df": self.df.to_dict(orient='dict'),
            "users": self.users,
            "name": self.name,
            "image": self.image
        }

    # GENERAL

    def nth_message(self, n):
        return self.df.iloc[n]

    def nth_messages(self, m, n):
        return self.df.loc[m: n].copy()

    # FILTERS

    def filter_by_date(self, start_date, end_date):
        return filter_by_date(self.df, start_date, end_date)

    def filter_by_days(self, date, days, prior=True):
        return filter_by_days(self.df, date, days, prior=prior)

    def filter_by_user(self, users):
        return filter_by_user(self.df, users)

    def filter_by_words(self, words):
        return word_mentions(self.df, words)
    
    def filter_by_phrase(self, phrase):
        return phrase_mentions(self.df, phrase)

    def filter_by_photos(self):
        return self.df.dropna(subset=['photos'])

    def filter_by_videos(self):
        return self.df.dropna(subset=['videos'])

    # TIME ANALYSIS

    def silences(self):
        return silences(self.df)

    # USER ANALYSIS

    def groupby_user(self):
        return self.df.groupby(['sender_name'])

    def user_total_messages(self):
        return self.groupby_user().size()

    def user_silences(self):
        user_dfs = []
        for user in self.users:
            user_df = self.filter_by_user([user])
            user_dfs.append(silences(user_df))
        return pd.concat(user_dfs).sort_values(by=['time_diff'], ascending=False)

    def user_words(self, words):
        words_df = self.filter_by_words(words)
        return words_df.groupby(['sender_name']).size()

    def user_most_used_words(self):
        user_most_used = {}
        for user in self.users:
            user_df = self.filter_by_user([user])
            user_most_used[user] = most_used_words(user_df)
        return user_most_used

    def user_mean_message_length(self):
        message_lengths_df = self.message_length()[['sender_name', 'content_length']]
        return message_lengths_df.groupby(['sender_name']).mean()

    def user_number_words(self):
        user_num_words = {}
        for user in self.users:
            user_df = self.filter_by_user([user])
            user_words_list = all_words(user_df)
            user_num_words[user] = {"total": len(user_words_list), "unique": len(list(set(user_words_list)))}
        return user_num_words
        
    # TEXT ANALYSIS

    def message_length(self):
        return message_length(self.df)

    def most_used_words(self, top, exclude=[]):
        return most_used_words(self.df, top, exclude=exclude)

    def all_words(self):
        return all_words(self.df)

    # CLUSTER ANALYSIS

    def conversation_lengths(self):
        return conversation_lengths(self.df)

    # API

    def summary(self):
        return {
            "users": self.users,    # TODO: sort by most active
            "name": self.name,
            "image": self.image,
            "total_messages": self.total_messages,
            "start_date": self.start_date.strftime('%B %Y'),
            "end_date": self.end_date.strftime('%B %Y'),
            "total_time": self.total_time.total_seconds(),
            "total_photos": total_messages(self.filter_by_photos()),
            "total_videos": total_messages(self.filter_by_videos()),
            "total_calls": total_messages(self.filter_by_phrase('started a video chat')),
            "mean_message_length": self.message_length()["content_length"].mean(),
            "longest_silence": silences(self.df).iloc[0]["time_diff"].total_seconds()
        }

    def messages_over_time(self, interval="auto", split_by_users=False):
        interval_options = {"daily": "Day", "monthly": "Month", "annual": "Year"}

        if interval == "auto":
            if self.total_time.days < 30:
                # Daily if there is less than 30 days of data
                interval = "daily"
            elif self.total_time.days < 900:
                # Monthly if there is less than 30 months of data
                interval = "monthly"
            else:
                interval = "annual"

        df_columns = ['datetime', 'content']
        
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
            self.df.sender_name = pd.Categorical(self.df.sender_name)   # Don't want to have missing sender names for some intervals.
            group_by.append("sender_name")
            df_columns.append("sender_name")

        grouped_by_interval = self.df[df_columns].groupby(group_by).count()

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

    def messages_by_period(self, period="auto", split_by_users=False):
        period_options = {"hour": "Hour", "day": "Day", "month": "Month"}

        if period == "auto":
            period = "hour"

        df_columns = ['datetime', 'content', 'period']
        group_by = ['period']

        if period == "hour":
            # Hour of the day
            str_time_format = '%H'
            self.df['period'] = self.df['datetime'].dt.strftime(str_time_format)
            self.df['period'] = self.df['period'] + ":00"
        elif period == "day":
            # Day of week
            str_time_format = '%A'
            period_order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            self.df['period'] = self.df['datetime'].dt.strftime(str_time_format)
            self.df.period = pd.Categorical(self.df.period, categories=period_order, ordered=True)
        elif period == "month":
            # Month of year
            str_time_format = '%b'
            period_order = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            self.df['period'] = self.df['datetime'].dt.strftime(str_time_format)
            self.df.period = pd.Categorical(self.df.period, categories=period_order, ordered=True)


        if split_by_users:
            self.df.sender_name = pd.Categorical(self.df.sender_name)   # Don't want to have missing sender names for some intervals.
            group_by.append("sender_name")
            df_columns.append("sender_name")

        grouped_by_interval = self.df[df_columns].groupby(group_by).count()

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

