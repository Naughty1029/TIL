PORTが空いているか確認できるコマンド
```
sudo ss -antup
```

```
curl -v http://localhost
```

ブラウザはデフォルトでサーバーの８０番ポートを見に行く

Webサーバーの設定を変更すれば、URLに応じて見に行くポートを変更できる

Rubyを実行して４５６７番ポートで動かして、そこを見に行かすことも可能！

http:0.0.0.0:80
http://127.0.0.1:4567

外部IPアドレス→http:0.0.0.0:80　ちょちょ
内部IPアドレス