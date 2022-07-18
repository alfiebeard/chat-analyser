import nltk
from collections import Counter


def message_length(df):
    # Remove missing values in the content column - as no length.
    filtered_df = df.dropna(subset=['content']).copy()
    filtered_df['content_length'] = filtered_df['content'].str.len()
    # filtered_df['content_length'] = filtered_df.apply(lambda entry: len(entry['content']), axis=1)
    return filtered_df


# Take a list of strings and create a regex filter for the list of strings.
def word_list_to_regex(words):
    regex_filter = ''
    for i in range(len(words)):
        if i != 0:
            regex_filter += '|'
        regex_filter += r'\b({0})\b'.format(words[i])
    return regex_filter


# Get complete words mentions in the content column of df for a list of words.
def word_mentions(df, words):
    # Remove missing values in the content column - as won't get any matches.
    filtered_df = df.dropna(subset=['content'])
    # Get regex filter for words
    regex_filter = word_list_to_regex(words)
    return filtered_df[filtered_df['content'].str.contains(regex_filter, na=False)]


# Get phrase mentions in the content column of df for a phrase.
def phrase_mentions(df, phrase):
    # Remove missing values in the content column - as won't get any matches.
    filtered_df = df.dropna(subset=['content'])
    return filtered_df[filtered_df['content'].str.contains(phrase)]


# Get the top most used words in df
def most_used_words(df, top=100, exclude=[]):
    # Create counter on the content column of df
    word_counts = Counter(" ".join(df["content"].dropna()).split())

    # Get stopwords and capitalised stopwords, e.g., the and The
    stopwords = nltk.corpus.stopwords.words('english')
    capital_stopwords = [word.capitalize() for word in stopwords]
    stopwords += capital_stopwords

    # Add custom words to exclude
    stopwords += exclude

    # Remove stopwords from word_counts
    for ignore in stopwords:
        if ignore in word_counts:
            del word_counts[ignore]
    
    return word_counts.most_common(top)


# Convert a sentence to a list of words
def sentence_to_words(sentence):
    tokenizer = nltk.RegexpTokenizer(r"\w+")
    words = tokenizer.tokenize(sentence)
    return words


# Get a list of all words in a content field of df
def all_words(df):
    filtered_df = df.dropna(subset=['content']).copy()
    
    words = []
    for _, row in filtered_df.iterrows():
        words.extend(sentence_to_words(row['content']))
    
    return words
