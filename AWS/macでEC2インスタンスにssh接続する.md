## 前提条件
EC2インスタンス作成済み

キーペア取得済み

## 秘密鍵を.sshフォルダに移動

```
mv ~/Downloads/my-test.pem ~/.ssh
```

## 秘密鍵の権限設定を変更する

秘密鍵の権限を400に変更
```
chmod 400 ~/.ssh/my-test.pem
```

## sshログインする

パブリックIPアドレスを指定してssh接続する

```
ssh -i ~/.ssh/my-test.pem ec2-user@*******
```
