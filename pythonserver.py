from flask import Flask
import requests
import json
from textblob import TextBlob
from bs4 import BeautifulSoup
app = Flask(__name__)

RESULTS = 'results'
BILLS = 'bills'
DESCRIPTION = 'description'
GOOGLE_API_KEY = 'AIzaSyA6msAMADzxXZxANboADutjj6RkQSPAyuA'
@app.route("/")
def hello():
    header_data = {'X-API-Key' : 'uxPHJm5m3RLJn1UrnpcX6VkNNFsCALUmv5xb3Mvb'}
    data = requests.get('https://api.propublica.org/congress/v1/bills/upcoming/house.json', headers=header_data)
    data = data.json()

    
    for item in data[RESULTS][0][BILLS]:
        billno = item['bill_number']
        googlepage = requests.get("https://www.google.com/search?q="+billno)
        soup = BeautifulSoup(googlepage.content, "lxml")
        aboutStuff = soup.find(id="resultStats")
        print int(re.search('(?<=About ).*(?= results)', aboutStuff)[0].replace(',', ''))



    

    #return data[RESULTS][0]


'''
Things to do:
BeautifulSoup stuff
Sentiment?
Lucas' API
host this on heroku/serveo/ngrok

'''    


@app.route("/latlng/<lat>/<lng>")
def latlng(lat, lng):
    data = requests.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + str(lat) + ',' + str(lng)+ '&key='+ GOOGLE_API_KEY)
    return data.text
