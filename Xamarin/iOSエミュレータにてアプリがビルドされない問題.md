下記のようなエラーが出力され、エミュレータにアプリがビルドされない
```
Failed to install the app 'com.cocoroworks.HelloWorld' on the device 'iOS 15.5 (19F70) - iPhone 11': simctl returned exit code 72
```

下記リンク先を参考に、XCodeの設定を反映したら治った

https://developer.apple.com/forums/thread/678469

XCodeのコマンドラインツールとして、設定がされていなかったのが原因？
詳しい内容はわからないが、iOS系がおかしい時はXCodeも確認する必要があるようだ。
