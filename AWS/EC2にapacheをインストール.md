```
yum list installed | grep httpd //リスト表示
sudo yum -y install httpd //インストール
sudo systemctl start httpd //起動
(startの他に stop, restart, statusなどある)
sudo systemctl enable httpd //自動起動
sudo systemctl list-unit-files -t service //自動起動設定確認
```