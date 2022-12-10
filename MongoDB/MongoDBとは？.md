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