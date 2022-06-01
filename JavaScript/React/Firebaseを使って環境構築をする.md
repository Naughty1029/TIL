## Create-React-App
create-react-appでReactの環境をつくる

```
npx create-react-app firebase-test
```

バージョンを17にする

```
npm i react@^17 react-dom@^17
```

## Firebaseの立ち上げ
1. Firebaseのコンソールへログイン
https://firebase.google.com/

- プロジェクトを新規作成
- プロジェクト名を入力→続行
- アナリティクス有効にして続行
- アナリティクスのアカウントを追加。地域を日本。→プロジェクトを作成

2. プロジェクトのホーム画面から「ウェブアプリ」を追加する
3. このアプリのFirebase Hostingも設定しますにチェックをつけてアプリを登録する
4. SDKの追加とCLIツールのインストールとデプロイは飛ばす
5. 歯車マークから「プロジェクトの設定」
6. リソースロケーションを「asia-northeast1」にする
7. FireStore Databaseに移動して、データベースの作成
8. 本番環境モードで開始。ロケーションを有効にする。

## FirebaseとReactAppの接続
