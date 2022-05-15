トランザクション処理とは、MySQLのテーブルにデータを保存などをする際に、他のユーザーからのアクセスを出来ないようにテーブルをロックする仕組みです。

トランザクション処理を書くことにより、同時にアクセスをした際に処理が完了するまで他のユーザーはデータを上書きすることは出来ません。

データの更新時に成功したらデータを更新して、失敗したらデータを元に戻しデータが壊れないようにします。

トランザクション処理はデータを守るために重要な役割を持っていますので必須の処理と言えます。

```php
//トランザクション まとまって処理 beginTransaction commit rollback
$pdo->beginTransaction();
try{
    //sql処理
    $sql = 'select * from contacts where id = :id';//名前付きプレースホルダー
    $stmt = $pdo->prepare($sql);//プリペアードステートメント
    $stmt->bindValue('id',3,PDO::PARAM_INT);//紐付け
    $stmt->execute();//実行
    $result = $stmt->fetchall();
    echo '<pre>';
    var_dump($result);
    echo '</pre>';
    $pdo->commit();
}catch(PDOException $e){
    $pdo->rollBack();//更新のキャンセル
}
```
