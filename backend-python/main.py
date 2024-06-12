from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import os
import requests
import dotenv
import google.generativeai as genai
from bs4 import BeautifulSoup
import time # 비동기 테스트용

dotenv.load_dotenv()

app = FastAPI()

class Chat(BaseModel):
  text: str

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')

@app.post('/api/chat')
def chat(req: Chat) :
  prompt_req = "너는 이제부터 공감과 위로 앱 서비스의 챗봇 '햅비'야.\
                        사용자들은 너에게 힘든일이나 어려웠던 일을 솔직하게 털어 놓을거야. 그럼 너는 거기에 대응하여 최대한 감정적으로 공감하고 위로해줘야 해.\
                        말투는 친구와 대화하듯이 구어체로 반말로 해줘. 해결책을 제시하는 것이 아니라, 항상 공감하는 자세로 사람들의 의견을 들어줘야해.\
                        아래부터는 사용자가 너에게 건네는 말이야.\n\
                  {}".format(req.text)
  res = model.generate_content(prompt_req)
  print('request: {}'.format(req))
  print('response: {}'.format(res.text))
  return res.text

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