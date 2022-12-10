meteorプロジェクト直下まで移動し、下記コマンドでMongoDB シェルを開く

```
meteor mongo
```

DBの一覧を確認

```
show dbs

>admin //MongoDBのデフォルトDB
>config //MongoDBのデフォルトDB
>local　//MongoDBのデフォルトDB
>meteor　//ここにデータが入っている
```

確認したいDBに切り替える

```
use 「DB名」
//use meteor
```

コレクション一覧確認
```
show collections
```

コレクションのドキュメント全件取得
```
db.collection名.find()
```