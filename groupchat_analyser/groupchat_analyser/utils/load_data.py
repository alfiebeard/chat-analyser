import pandas as pd
import json
from groupchat_analyser.utils.df_utils import add_date_info
# from utils.df_utils import add_date_info
from os import listdir
from os.path import isfile, join
import collections


def load_messages(message_files):
    dfs = []

    # Sort message_files in numerical order
    reordered_message_files = {int(k[8:-5]): v for k, v in message_files.items()}
    reordered_message_files = collections.OrderedDict(sorted(reordered_message_files.items()))
    reordered_message_files_keys = list(reordered_message_files.keys())
    
    for i in range(len(reordered_message_files_keys)):
        json_file = json.loads(reordered_message_files[reordered_message_files_keys[i]].read())
        dfs.append(pd.DataFrame.from_dict(json_file['messages']))
        
        # If first filename load participants, chat name, photo, etc..
        if i == 0:
            chat_members = [participant["name"] for participant in json_file['participants']]
            chat_name = json_file['title']
            chat_image = json_file['image']

    df = pd.concat(dfs)

    # Reverse - so in chronological order
    df = df.iloc[::-1].reset_index(drop=True)

    df = add_date_info(df)

    return df, chat_members, chat_name, chat_image


def get_all_chat_names(data_path):
    return listdir(data_path + "/messages/inbox")


def load_message_data(chat_path):
    message_filenames = get_all_message_filenames(chat_path)
    df, chat_members, chat_name, chat_image = load_all_messages(chat_path, message_filenames)
    return df, chat_members, chat_name, chat_image


def get_all_message_filenames(chat_path):
    message_file_names = [f for f in listdir(chat_path) if isfile(join(chat_path, f)) and f[:7] == "message" and f[-5:] == ".json"]

    # Sort in numerical order
    sorted_file_names = [None] * len(message_file_names)
    for name in message_file_names:
        position = int(name[8:-5])
        sorted_file_names[position - 1] = name
    
    return sorted_file_names


def load_all_messages(chat_path, message_filenames):
    dfs = []
    
    for i in range(len(message_filenames)):
        message_data, participants, name, image = load_message(chat_path, message_filenames[i])
        
        # If first filename load participants, chat name, photo, etc..
        if i == 0:
            chat_members = [participant["name"] for participant in participants]
            chat_name = name
            chat_image = image

        dfs.append(message_data)

    df = pd.concat(dfs)

    # Reverse - so in chronological order
    df = df.iloc[::-1].reset_index(drop=True)

    df = add_date_info(df)
    
    return df, chat_members, chat_name, chat_image


def load_message(chat_path, filename):
    with open(chat_path + filename, 'r') as json_data:
        file = json.loads(json_data.read())
    return pd.DataFrame.from_dict(file['messages']), file['participants'], file['title'], file['image']
