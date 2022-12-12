Json形式のドキュメントでデータを保管するので、JavaScriptでの操作が容易

データをネストして保管できる

```json
{
    "title":"Name of the Wind",
    "rating":9,
    "pages":400,
    "author": {
        "firstName":"masahiro",
        "lastName":"watanabe"
    }
}
```
※SQLのようにリレーションを持たせることも可能

mongoDB Atlas 

MongoDBのインストール方法
https://linuxhint.com/install-mongodb-mac-m1/
https://reffect.co.jp/windows/mac-mongodb-install

MongoDB
→Collectionsにデータを格納
→bson形式（Binary Json）でまとめられている
→_idプロパティが付与される
→データをネストして管理することも可能

### mongosh
```
show dbs //DBの中身確認
use bookstore //DB切り替え
db.books.find() //コレクションの中身表示
db.books.insertOne({}) //コレクションを1件追加

db.authors.insertOne({}) //コレクションがない場合はコレクションが新規追加される

db.books.insertMany([]) //データを複数追加できる

//下記のようにフィルターをかけることができる（完全一致）
db.books.find({author:"Masahiro Watanabe"})

//第二引数を下記のようにすると、取得するデータを絞り込める
db.books.find({author:"Masahiro Watanabe"},{author:1})
>>>
{ _id: ObjectId("6395456d22ee562ee33d7a2a"),
  author: 'Masahiro Watanabe' }
{ _id: ObjectId("6395456d22ee562ee33d7a2b"),
  author: 'Masahiro Watanabe' }
>>>
```

### mongoshのメソッド

```
//データの件数を表示
db.books.find({author:"Masahiro Watanabe"}).count()

//取得数のリミット
db.books.find({author:"Masahiro Watanabe"}).limit()

```

### operator
複雑な条件でデータを抽出することができる

```
//greater than
db.books.find({rating:{$gt:4}})

//less than
db.books.find({rating:{$lt:4}})
```

#### or条件
```
db.books.find({$or:[{rating:9},{rating:3}]})
```

#### in / nin

```
//ratingが7,8,9のものが返ってくる
db.books.find({rating:{$in:[7,8,9]}})

//ratingが7,8,9以外のものが返ってくる
db.books.find({rating:{$nin:[7,8,9]}})
```

#### 配列の検索
```
//配列に含まれていれば返す場合
db.books.find({genres:"fantasy"})

//厳密に一致させる場合は下記
db.books.find({genres:["fantasy"]})
```

#### ネスト先の検索

```
db.books.find({"reviews.name":"taro"})
```

#### 削除

```
db.books.deleteOne({_id: ObjectId("63958167ffa94a539a0582f9"),})
```

#### 更新
第一引数に更新対象。第二引数に更新値を$setで定義する
```
db.books.updateOne({_id: ObjectId("63958167ffa94a539a0582f8")}, {$set: {rating:3}})
```

下記のようにする一気に更新できるぜ！
```
db.books.updateMany({name:"masa"},{$set:{name:"masahiro"}})
```

### MacのmongoDBの格納場所
```
/usr/local/etc/mongod.conf　//mongodbの設定ファイル
/usr/local/var/mongodb //wtファイルがあるよ

//下記は実行ファイルだよ
/usr/local/opt/mongodb-community@5.0
/usr/local/opt/mongodb-database-tools
/usr/local/opt/mongosh
```

### MongoDBのドライバー
いろんなプログラミング言語からMongoDBを操作するためにはドライバーが必要。ドライバーの一覧は下記サイトに記載。

https://www.mongodb.com/docs/drivers/?_ga=2.180193380.1326311585.1670654244-1076080562.1669524722


Driverのインストール

```
npm install mongodb
```