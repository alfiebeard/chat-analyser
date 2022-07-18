def filter_by_user(df, users):
    return df[df['sender_name'].isin(users)]
    

def user_silences(df, user):
    pass