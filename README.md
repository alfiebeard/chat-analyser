# Chat Analyser
This project builds a chat analyser, displaying statistics and key graphs/trends from chat data. The main target application is for Facebook chat data and the datasets are assumed to be of this format, although the analyser could easily be extended to other datasets.

# Structure

## Backend
Contains the Python Flask app, which can be used to run the chat analyser, and any other required utilities.

## Frontend
A React App containing the GUI for the analyser.

## groupchat_analyser
A Python package which contains all the analysis tools for processing the data.

# Getting Started

## Envionment
Python 3.10.4

## Installation
1. Clone the repository
```
git clone https://github.com/alfiebeard/chat-anayser.git
```
2. Create virtual environment
```
virtualenv chat_analyser_venv
source chat_analyser_venv/bin/activate
```
Or with conda
```
conda create --name chat_analyser python=3.9
source activate chat_analyser
```
3. Install requirements.txt
```
pip install -r requirements.txt
```
4. Install groupchat_analyser package
```
pip install -e groupchat_analyser
```

## Running
```
python app.py
```
Navigate to http://127.0.0.1:5000/

# Next Steps
* Add pages to improve GUI and display more trends/graphs.
* Advanced chat search functionalities.
* Filtering out of names, nicknames and stop words in word clouds.

# License
Licensed under the [MIT License](LICENSE.md).
