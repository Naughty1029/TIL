```
SSH接続 (win)
webブラウザで表示されるのは下記フォルダ
/var/www/html
所有者変更
sudo chown -R ec2-user /var/www/html
index.htmlなどを作成し、保存して、
ブラウザ上でpublicIPアドレスを入力し、
内容が表示されればOKです。
(http://IPアドレス)
```