from setuptools import setup

setup(
    name="groupchat_analyser",
    version="0.1.0",
    author="Alfie Beard",
    author_email="alfiebeard96@gmail.com",
    packages=['groupchat_analyser'],
    descriptions="A python package for analysing Facebook messenger chats.",
    install_requires=[
        'matplotlib==3.5.2',
        'nltk==3.7',
        'numpy==1.22.4',
        'pandas==1.4.2',
        'regex==2022.6.2',
        'sklearn==0.0'
    ]
)
