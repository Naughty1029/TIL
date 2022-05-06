## 実コード

[https://codesandbox.io/s/react-router-7srv63](https://codesandbox.io/s/react-router-7srv63)

## 前提条件

- React v17.0.2
- React-Router-DOM v5.3.1

ライブラリをインストール

```
npm install react-router-dom@5.3.1
```

## 事前準備

index.js

```jsx
import { StrictMode } from "react";
import ReactDom from "react-dom";

import App from "./App";

ReactDom.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
```

App.jsx

```jsx
import "./styles.css";

export default function App() {
  return (
    <div className="App">
    </div>
  );
}
```

Home.jsx

```jsx
export const Home = () => {
  return (
    <div>
      <h1>Homeページです</h1>
    </div>
  );
};
```

Page1.jsx

```jsx
export const Page1 = () => {
  return (
    <div>
      <h1>Page1ページです</h1>
    </div>
  );
};
```

Page2.jsx

```jsx
export const Page2 = () => {
  return (
    <div>
      <h1>Page2ページです</h1>
    </div>
  );
};
```

## 基本的なページ遷移

```jsx
//必要なものをimportする
//BrowserRouter配下はルーティングが有効になる
//Linkはaタグの役割をするもの
//Switch配下は、どのpathの場合にどのコンポーネントを出すのかを定義する
//RouteはSwitchの中でrouteにマッチしたものを表示するために使う
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

//各コンポーネントを読み込んでおく
import { Home } from "./Home";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/page1">Page1</Link>
        <br />
        <Link to="/page2">Page2</Link>
      </div>
      <Switch>
        {/* exactは完全一致を対象にする */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/page1">
          <Page1 />
        </Route>
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
```

## ネストされたページのルーティング設定

まずページを用意する

Page1DetailA.jsx

```jsx
export const Page1DetailA = () => {
  return (
    <div>
      <h1>Page1Detailページです</h1>
    </div>
  );
};
```

Page1.jsxにLinkを設定

```jsx
import { Link } from "react-router-dom";
export const Page1 = () => {
  return (
    <div>
      <h1>Page1ページです</h1>
      <Link to="/page1/detailA">DetailA</Link>
      <br />
      <Link to="/page1/detailB">DetailB</Link>
    </div>
  );
};
```

App.jsx

rederプロパティの中で、ネストが可能

renderのpropsにはルーティングに関する様々な情報が入っているので、それらを活用する

※以下では分割代入で値を取り出している

```jsx
{/* renderを使うとページのネストが可能 */}
{/* propsを渡すことでページURLの保証が可能 */}
{/* propsの中にはさまざまな情報が入っているのでそれらを利用 */}
<Route
  path="/page1"
  render={({ match: { url } }) => (
    <Switch>
      <Route exact path={url}>
        <Page1 />
      </Route>
      <Route path={`${url}/detailA`}>
        <Page1DetailA />
      </Route>
      <Route path={`${url}/detailB`}>
        <Page1DetailB />
      </Route>
    </Switch>
  )}
/>
```

画像

## ルート定義の分割

ルーター部分は別途コンポーネントにしてimportする

App.jsx

```jsx
import { BrowserRouter, Link } from "react-router-dom";
//ルーター部分はコンポーネントにして切り出す
import { Router } from "./route/Router";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Home</Link>
        <br />
        <Link to="/page1">Page1</Link>
        <br />
        <Link to="/page2">Page2</Link>
      </div>
      <Router />
    </BrowserRouter>
  );
}
```

さらにネストされているとこは情報だけ配列にしてimportすると見通しがよくなる

route/Router.jsx

```jsx
import { Switch, Route } from "react-router-dom";

import { Home } from "../Home";
import { Page2 } from "../Page2";
import { Page1Routes } from "./Page1Routes";

export const Router = () => {
  return (
    <Switch>
      {/* exactは完全一致を対象にする */}
      <Route exact path="/">
        <Home />
      </Route>
      {/* page1の情報が複雑なので、さらに分割する */}
      {/* Page1Routesをimportしてmap関数でループさせる */}
      <Route
        path="/page1"
        render={({ match: { url } }) => (
          <Switch>
            {Page1Routes.map(({ path, exact, children }) => (
              <Route key={path} path={`${url}${path}`} exact={exact}>
                {children}
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route path="/page2">
        <Page2 />
      </Route>
    </Switch>
  );
};
```

route/Page1Routes.jsx

```jsx
import { Page1 } from "../Page1";
import { Page1DetailA } from "../Page1DetailA";
import { Page1DetailB } from "../Page1DetailB";

//ページ情報を含めたオブジェクトに配列にしてexportする
export const Page1Routes = [
  {
    path: "",
    exact: true,
    children: <Page1 />
  },
  {
    path: "/detailA",
    exact: false,
    children: <Page1DetailA />
  },
  {
    path: "/detailB",
    exact: false,
    children: <Page1DetailB />
  }
];
```

## URLパラメータの設定

Page2のルーティング部分を変更

Route.jsx

```jsx
{/* Page2Routesをimportしてmap関数でループさせる */}
<Route
  path="/page2"
  render={({ match: { url } }) => (
    <Switch>
      {Page2Routes.map(({ path, exact, children }) => (
        <Route key={path} path={`${url}${path}`} exact={exact}>
          {children}
        </Route>
      ))}
    </Switch>
  )}
/>
```

URLパラメータを扱う場合は :parameter と記述する

route/Page2Routes.jsx

```jsx
import { Page2 } from "../Page2";
import { UrlParameter } from "../UrlParameter";

//URLパラメータを扱う場合は :parameter と記述する
export const Page2Routes = [
  {
    path: "",
    exact: true,
    children: <Page2 />
  },
  {
    path: "/:id",
    exact: false,
    children: <UrlParameter />
  }
];
```

Page2.jsxにパラメータページへのリンクとコンポーネントを設置

Page2.jsx

```jsx
import { Link } from "react-router-dom";
export const Page2 = () => {
  return (
    <div>
      <h1>Page2ページです</h1>
      <Link to="/page2/100">URL Parameter</Link>
    </div>
  );
};
```

UrlParameter.jsxを作成し、UseParams()を使うとパラメータを受け取れる

UrlParameter.jsx

```jsx
import { useParams } from "react-router-dom";

export const UrlParameter = () => {
  //parameterを受け取るにはuseParamsを使う
  const { id } = useParams();
  return (
    <div>
      <h1>UrlParameterページです</h1>
      <p>パラメーターは{id}です</p>
    </div>
  );
};
```

## クエリパラメータの使い方

Page2.jsx

```jsx
import { Link } from "react-router-dom";
export const Page2 = () => {
  return (
    <div>
      <h1>Page2ページです</h1>
      <Link to="/page2/100">URL Parameter</Link>
      <br />
      <Link to="/page2/100?name=hoge">Query Parameter</Link>
    </div>
  );
};
```

useLocationを使うとクエリパラメータを簡単に扱うことができる

UrlParameter.jsx

```jsx
import { useParams, useLocation } from "react-router-dom";

export const UrlParameter = () => {
  const { id } = useParams();
  //useLocationを使うとクエリパラメータを簡単に扱うことができる
  const { search } = useLocation();
  //JavaScriptの機能
  const query = new URLSearchParams(search);

  return (
    <div>
      <h1>UrlParameterページです</h1>
      <p>パラメーターは{id}です</p>
      <p>クエリパラメーターは{query.get("name")}です</p>
    </div>
  );
};
```

## ページ遷移時にstateを渡す

Page1.jsx

```jsx
import { Link } from "react-router-dom";
export const Page1 = () => {
  // 受け渡し用の配列を作成
  // この配列をDetailAのページへ情報を引き継ぎたい
  const arr = [...Array(100).keys()];
  return (
    <div>
      <h1>Page1ページです</h1>
      <Link to={{ pathname: "/page1/detailA", state: arr }}>DetailA</Link>
      <br />
      <Link to="/page1/detailB">DetailB</Link>
    </div>
  );
};
```

Page1DetailA.jsx

```jsx
import { useLocation } from "react-router-dom";

//stateを確認するにはuseLocationを使う
export const Page1DetailA = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <h1>Page1Detailページです</h1>
    </div>
  );
};
```

## useHistoryを使った方法

Page1.jsx

```jsx
import { Link, useHistory } from "react-router-dom";
//Linkを使わないページ遷移をするにはuseHistoryを使う
export const Page1 = () => {
  const arr = [...Array(100).keys()];

  //useHistoryのpushメソッドを使うと画面遷移できる
  const history = useHistory();
  const onClickDetailA = () => history.push("/page1/detailA");
  return (
    <div>
      <h1>Page1ページです</h1>
      <Link to={{ pathname: "/page1/detailA", state: arr }}>DetailA</Link>
      <br />
      <Link to="/page1/detailB">DetailB</Link>
      <br />
      <button onClick={onClickDetailA}>DetailA</button>
    </div>
  );
};
```

戻るボタンも実装できる

Page1DetailA.jsx

```jsx
import { useHistory, useLocation } from "react-router-dom";

//stateを確認するにはuseLocationを使う
export const Page1DetailA = () => {
  const { state } = useLocation();

  //戻るボタンも実装できる
  const history = useHistory();
  const onClickBack = () => history.goBack();

  return (
    <div>
      <h1>Page1Detailページです</h1>
      <button onClick={onClickBack}>戻る</button>
    </div>
  );
};
```

## 404ページの設定方法

Page404を作成する

Page404.jsx

```jsx
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div>
      <h1>ページが見つかりません</h1>
      <Link to="/">Topページ</Link>
    </div>
  );
};
```

Route.jsxの末尾に追加

```jsx
<Route path="*">
  <Page404 />
</Route>
```
