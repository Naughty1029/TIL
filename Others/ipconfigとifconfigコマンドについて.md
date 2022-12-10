## ipconfig / ifconfigとは？
IPネットワークの設定情報を表示するためのコマンド。

- ipconfig：Windowsのコマンド環境
- ifconfig：UNIXのコマンド環境

## ipconfigについて
```
ipconfig /all
```
`/a`は省略可能

表示される内容 
- ホスト名
- ノードタイプ
- ネットワークカード名
- MACアドレス
- IPルーティング
- DHCPが有効または無効か
など

### ifconfig
```
ifconfig -a
```

表示される内容 
- 接続媒体（イーサネットなど）
- MACアドレス
- IPアドレス
- サブネットマスク
- インターフェイスの起動状態
- ブロードキャストの使用状況
- MTUサイズ
- インターフェイスの統計値

