```
git branch // ブランチの確認
git branch <new> // ブランチの作成
git branch -m <old> <new> // ブランチ名変更
git switch <ブランチ名> // ブランチの切替
git siwtch -c <ブランチ名> // ブランチ作成 + 切替
git branch -d <ブランチ名> // ブランチの削除
git push --delete origin ブランチ名 //リモートブランチの削除
```

昔はcheckoutでブランチ切替していたが、機能が多すぎるという事で、switchとrestoreの新コマンドが追加された