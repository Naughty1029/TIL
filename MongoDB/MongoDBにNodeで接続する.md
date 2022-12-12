### MongoDBのドライバー
いろんなプログラミング言語からMongoDBを操作するためにはドライバーが必要。ドライバーの一覧は下記サイトに記載。

https://www.mongodb.com/docs/drivers/?_ga=2.180193380.1326311585.1670654244-1076080562.1669524722


Driverのインストール

```
npm install mongodb
```

```javascript
const {MongoClient} = require("mongodb");

let dbCollection;

module.exports = {
    connectToDb: (cb)=> {
        //ローカルコンピュータに接続する場合は下記
        MongoClient.connect("mongodb://localhost:27017/bookstore")
            .then((client)=>{
                dbCollection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb()
            })
    },
    getDb: ()=> dbCollection
}
```

```javascript
const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db")

//init app
const app = express();

//db接続
let db;
connectToDb((err)=>{
    if(!err) {
        app.listen(3000,()=> {
            console.log("server start");
        });
        db = getDb()
    }
})


app.get("/books",(req,res)=> {
    let books = []
    db.collection("books")
        .find()
        .sort({name:1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({error:"could not fetch the documents"})
        });
})

app.get("/books/:id", (req,res) => {
    if(ObjectId.isValid(req.params.id)){
        db.collection("books")
            .findOne({_id:ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({error:"could not fetch the documents"})
            });
    } else {
        res.status(500).json({error:"could not fetch the documents"})
    }

})
```