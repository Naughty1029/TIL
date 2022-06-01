参考リンク
https://zenn.dev/web_tips/articles/c026df542bc18b

## useStateで配列に追加する方法
配列に要素を追加する方法はネット上にあふれている。
以下がその例で、スプレッド構文を使用するのが推奨されている。

```javascript
const [sports, setSports] = useState([]);
const addSports = () => {
    setSports([...sports, "baseball"]);
}
```

## useStateで配列の特定の要素を更新する方法
それでは配列の特定の要素だけを更新したい場合はmap()を使うと実現できる。
以下の例だと、indexが2の要素を"badminton"に、それ以外の要素は元のままの"sport"になるように記述している。

```javascript
const initialState = [
    "baseboll",
    "soccer",
    "basketball",
    "volleyball",
    "tennis"
];
const [sports, setSports] = useState([]);
const updateSportsList = () => {
    setSports(
        sports.map((sport, index) => (index === 2 ? "badminton" : sport))
    );
};
```