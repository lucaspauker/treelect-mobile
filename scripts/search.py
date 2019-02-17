from flask import Flask
import requests
import json

app = Flask(__name__)

RESULTS = 'results'
BILLS = 'bills'
DESCRIPTION = 'description'
GOOGLE_API_KEY = 'AIzaSyA6msAMADzxXZxANboADutjj6RkQSPAyuA'

@app.route("/")
def hello():
    header_data = {'X-API-Key' : 'uxPHJm5m3RLJn1UrnpcX6VkNNFsCALUmv5xb3Mvb'}
    data = requests.get('https://api.propublica.org/congress/v1/bills/search.json?query=marijuana', headers=header_data).json()
    b = list()
    for item in data[RESULTS][0][BILLS]:
        title = item['title']
        b.append(title)
        
    return b
