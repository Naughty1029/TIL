# https://ai-inter1.com/python-webscraping/
import requests
from bs4 import BeautifulSoup
import re

url = 'https://news.yahoo.co.jp'
res = requests.get(url)

soup = BeautifulSoup(res.text, "html.parser")

# https://ctrlq.org/beautifier/ 整形
elems = soup.find_all(href=re.compile("news.yahoo.co.jp/pickup"))

# print(elems[0].contents[0])
# print(elems[0].attrs["href"])

#ループ文で呼び出す
# for elem in elems:
#     print(elem.contents[0])
#     print(elem.attrs["href"])


path = './test.txt'

#追記はaタグ
with open(path, mode='w') as f:
    for elem in elems:
        if isinstance(elem.contents[0], str):
            f.write(elem.contents[0]+"\n")