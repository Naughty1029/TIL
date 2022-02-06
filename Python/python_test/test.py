#コメント
print("Hello World")

#演算
print(1+1)
print(1-1)
print(1*2)
print(10/2)
print(5%3)

# 変数→文字化と共通化がメリット
string = "Hello World"
integer = 1
float = 1.1
print(string)

# 変数の型
print(type(string))
print(type(integer))
print(type(float))

# エラー
# print(type(string + integer))
# 予約語は変数名に定義できない

# 条件分岐と関係演算子
# if else 
# ==, !=, <, >,<=,>=
size = "S"
if size == "L":
    print("Lサイズです")
elif size == "M":
    print("Mサイズです")
else:
    print("Sサイズです")

# 関数
def test(arg):
    if(arg < 10):
        return "Nope"
    else:
        return "Good"

print(test(9))

#list
test_list = ["S","M","L"]
print(test_list)
print(test_list[0])

#for ループ
for i in range(3):
    print(test(i))

for item in test_list:
    print(item)

#with 開始から終了まで一連の処理をやってくれる
#open() ファイルに追記や解析できる
with open("./test.txt","r") as file:
    print(file.read())
    print(file.name)
    print(file.mode)

#クラスとインスタンス
class Card:
    def __init__(self,date,user_name):
        self.date = date
        self.user_name = user_name

    def message(self):
        return "この投稿は" + self.date + "に" + self.user_name + "さんが投稿しました"

date_a = "2020-01-01"
user_name_a = "Taro"

card_a = Card(date_a,user_name_a)

print(card_a.date , card_a.user_name)
print(card_a.message())

#importとモジュール(変数や関数やクラスなど汎用的に使えるようにまとめたコード群)
import math
print(math.pi)

# 1.デフォルトモジュール
# 2.外部モジュール : Numpy , Pandas , Flask , Django
# 外部モジュールの探し方　https://pypi.org/

import numpy
numpy_list = [3,1,4,5,6,333,5,6666]
print(numpy.sum(numpy_list))