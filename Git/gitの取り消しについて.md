## addしていないコードを消す

新規作成ファイルを消す
```
git clean -f <ファイル名>
```

ファイル変更を取り消す(localとリモート追跡との差分を見る)
```
git restore <フォルダ/ファイル> // ファイル指定して変更取消
git restore . // 変更を全て取消
```

## git add（ステージング）を取り消す

下記どちらでも可能
```
git restore --staged <フォルダ/ファイル> // ファイル取消
git restore --staged . // add全て取消
git reset <ファイル> // ファイルの取消
git reset // addを全て取消
```

## git commitを取り消す
どの状態まで戻すのかオプションで指定可能
```
git reset --soft HEAD^ //ステージングの状態まで戻す
git reset --mixed HEAD^ //コードを書いている状態に戻す
git reset --hard HEAD^ //コードを書いたこと自体もなくなる
```

## git pushを取り消したい
コミット履歴を残す場合
```
git revert <commitID>
git push // 取消コミットのプッシュ
```

コミット履歴を残さない場合
```
git reset --soft <commitID>
git push -f // 強制プッシュ
```

## プルリクを取り消す
プルリクエストを出したあとは、プルリクがclosedになる
```
git push --delete origin ブランチ名 //リモートブランチの削除
```

