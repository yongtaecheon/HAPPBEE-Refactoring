from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import os
import requests
from bs4 import BeautifulSoup
import time # 비동기 테스트용

app = FastAPI()

@app.get('/')
def hello() :
  print('hello world')
  return 'Hello World'

class Chat(BaseModel):
  text: str

@app.post('/api/chat')
def chat(req: Chat) :
  print(req)
  return '안녕. 난 햅비냥이야!'

def CrawlHospitalList(location):
  hoslist = []

  url = f'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query={location}+근처+심리상담센터'

  response = requests.get(url)

  if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    query = soup.select('div.qbGlu')
    
    for q in query:
        title = q.select_one('span.YwYLL').text
        phone_number = q.select_one('div.mqM2N.l8afP').text
        address = soup.select_one('span.Pb4bU').text

        numeric_phone_number = ''.join(filter(lambda x: x.isdigit() or x =='-', phone_number))

        hoslist.append({'name': title, 'phone_number': numeric_phone_number, 'address':address})
        # print(title)
        # print(numeric_phone_number)
        # print(address)
  else : 
    print(response.status_code)

  return hoslist

@app.get('/api/hospital/{location}')
def getHospital(location: str):
  print(location)
  res = CrawlHospitalList(location)
  return res

if __name__ == '__main__':
  uvicorn.run('main:app', reload=True)