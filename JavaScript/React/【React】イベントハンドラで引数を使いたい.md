参考リンク
https://qiita.com/tsuuuuu_san/items/73747c8b6e6e28f6bd23

## 普通に引数は渡せない
```javascript
render() {
  return (
    <div>
      <button onClick={this.click(1)}>One</div>
    </div>
  );
}

click(value) {
}
```

これでは
`関数を実行している`
記述になってしまう。

正しい方法

```javascript
render() {
  return (
    <div>
      <button onClick={this.click}>One</div>
    </div>
  );
}

click() {
}
```

## 引数使いたい
[Passing Arguments to Event Handlers](https://reactjs.org/docs/handling-events.html#passing-arguments-to-event-handlers)

## 方法1：引数なしの関数でreturnしたらいいじゃない
```javascript
<button onClick={ () => this.click(1) }>One</div>
```

超納得。
関数定義の中で引数付きの関数を実行すると言う記述です。

アロー関数はthisを束縛しません(一つ上のthisを探す)
そのため、constructorでthisを束縛(bind)しなくても動きます。

ただ、これだと(再)描画のたびに関数を作成することになるため、
Bestとは呼べない模様。
参考：https://code.i-harness.com/ja/q/1c6e0e2

## 方法2：bind関数使う
```javascript
<button onClick={ this.click.bind(this, 1) }>One</div>
```

でもbind書きたくないですね。

### 方法2-2

そもそもonClickに登録する関数をアロー関数で定義すればいいじゃない。

```javascript
clickButton = () => {
  this.click(1);
};

render() {
  return (
    ...
    <button onClick={this.clickButton}>One</div>
    ...
  );
}
```


## 方法3:HTML5のカスタム属性を利用する
```javascript
render() {
  return (
    <div>
      <button onClick={this.click} data-num="1">One</button>
    </div>
  );
}

click() {
  console.log(e.currentTarget.getAttribute('data-num'));  // 1
}
```
