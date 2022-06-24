## stash
```
git stash
git stash save <コメント>
git stash save -u <コメント> //未追跡も退避
git stash list // stashの表示
git show stash@{1} 1つ前の内容
```

番号指定がなければ最新のstashが対象になる
```
git stash apply stash@{1} 適用させてstashも残す
git stash drop stash@{1} stash削除
git stash pop stash@{1} 適用させてstash削除
```

