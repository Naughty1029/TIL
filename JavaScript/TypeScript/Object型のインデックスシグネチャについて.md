参考URL  
https://marsquai.com/a70497b9-805e-40a9-855d-1826345ca65f/1dc3824a-2ab9-471f-ad58-6226a37245ce/9a50771d-825f-4186-a56e-ba5f0d07b0e8/


プロパティを[key: T]: Uのように定義することで、その型のキーのプロパティが不特定多数あるという定義をすることができます。

Tにはstring、またはnumberのみ指定することができます。

```javascript
let user: {
    username: string,
    [key: number]: boolean
}

user = { username : "marsquai" , 1: true, 2: false, 3: true, 100:false};
```

参考リンク先  
https://typescript-jp.gitbook.io/deep-dive/type-system/index-signatures
https://qiita.com/sa_tech0518/items/59026af48a9aa24d383f