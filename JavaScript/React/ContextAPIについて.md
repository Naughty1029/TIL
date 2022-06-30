## Context APIとは？
propsをバケツリレーすることなく、必要なコンポーネントに共有する仕組み

3つのステップで構築可能です。

1. Contextを作成する
2. データが必要なコンポーネントから、Contextを使用する
3. データを明示しているコンポーネントから、Contextを提供する

## Contextを作成する

まず、Contextを作るにはcreateContextを使います。
createContextの式は下記です。

```javascript
const ThemeContext = createContext(初期値:defaultValue);
```

引数  
データの初期値(null値許容)

返り値  
Contextオブジェクト

createContextは引数にデータの初期値を取り、Contextオブジェクトというものを返します。
試しに、Contextオブジェクトの中身は確認すると以下のようになっています。

```javascript
export const ThemeContext = createContext("light");
console.log(ThemeContext);
```

```javascript
{
  _currentValue: "light"
  _currentValue2: "light"
  _threadCount: 0
  Provider: Object
  Consumer: Object
  _defaultValue: null
  _globalName: null
  _currentRenderer: null
  _currentRenderer2: null
}
```

## Contextを使用する  
React HooksのuseContextを使うことで、ComponentからContextのデータを読み込むことができるようになります。

```javascript
const theme = useContext(ThemeContext)
```

引数  
createContextで作成したContextオブジェクト

返り値  
Contextの値

後ほど説明するProviderを設定しなくても、useContextはデフォルトでcreateContextの引数に渡した初期値を返します。

App.js
```javascript
import { createContext } from "react";
import { Child } from "./Child";

export const ThemeContext = createContext("light");

export default function App() {
  return <Child />;
}
```

Child.js
```javascript
import { useContext } from "react";
import { ThemeContext } from "./App";

export const Child = () => {
  const theme = useContext(ThemeContext);
  console.log(theme);

  return <div>Child</div>;
};
```
結果
```
light
```

え？じゃあ、もうこれで完成でいいじゃんない？

と感じる方もいるかもしれません。

しかし、このままではひとつ問題があります。

それは、createContextの引数に渡した初期値はstateのように状態を変化させることができないということです。

これでは困ります。

そこで活用するのがProviderです。

## Contextを提供する

Contextの値として、初期値以外を渡すにはContextオブジェクトの中のProviderを使います。
以下のように記述し、valueプロパティにデータを渡すことで`ThemeContext.Provider`以下のコンポーネントでそのデータにアクセスすることができるようになります。

```javascript
<ThemeContext.Provider value={データ}>
  <Child />
</ThemeContext.Provider>
```

肝心なのは、ProviderはuseStateと組み合わせることで、value属性にstateを渡せるようになるということです。    
以下をみてください。

App.js
```javascript
import { createContext, useState } from "react";
import { Child } from "./Child";

export const ThemeContext = createContext("light");

export default function App() {
  const [theme, setTheme] = useState("dark"); //追記
  return (
    <ThemeContext.Provider value={theme}> //変更
      <Child />
    </ThemeContext.Provider>
  );
}
```
Child.js
```javascript
import { useContext } from "react";
import { ThemeContext } from "./App";

export const Child = () => {
  const theme = useContext(ThemeContext);
  console.log(theme);

  return <div>Child</div>;
};
```

結果
```
dark
```

さっきまでは出力結果が`light`だったのに、今回は`dark`に変わりました。

次に、`setTheme`も渡すことで、Childコンポーネントでstateを変更してみます。

App.js
```javascript
import { createContext, useState } from "react";
import { Child } from "./Child";

export const ThemeContext = createContext("light");

export default function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}> //変更
      <Child />
    </ThemeContext.Provider>
  );
}
```

```javascript
import { useContext } from "react";
import { ThemeContext } from "./App";

export const Child = () => {
  const { theme, setTheme } = useContext(ThemeContext); //変更
  console.log(theme);

  return (
    <>
      <div>Child</div>
      <button onClick={() => setTheme("light")}>color change</button> //追加
    </>
  );
};
```
結果
```
dark  ←最初のレンダリング
light  ←ボタンクリック後
```

ちゃんと変わりました！成功です。

## おわりに
Context APIを使うことで、useState単体よりもかなりpropsの受け渡しがラクになります。  
また、useReducerと組み合わせて使うことで、更に便利になりますので、興味がある人はぜひ調べてみてください。  
