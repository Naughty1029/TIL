-u は --set-upstream と同じ
upstream(上流)

オプションを付けると
ローカルリポジトリの現在ブランチ(main)の上流をorigin/main に規定

なので、２回目以降はorigin mainを省略できる
```
オプションあり / なし
git push / git push origin main
git fetch / git fetch origin main
git pull / git pull origin main
```

上流ブランチの設定確認
```
git branch -vv
```

上流ブランチの変更
```
git branch -u リモートリポジトリ名/ブランチ名
```

main