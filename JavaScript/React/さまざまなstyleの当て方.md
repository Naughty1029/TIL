## Inline Style

Reactがデフォルトで提供している方法。ライブラリ必要なし

style属性にJavaScriptのオブジェクトを指定することでCSSが効く

- CSSのプロパティ名はキャメルケースで記述する
- 属性値は文字列
- コンマ区切りにする

```jsx
export const InlineStyle = () => {
  const containerStyle = {
    border: "solid 2px #392eff",
    borderRadius: "20px",
    padding: "8px",
    margin: "8px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  };
  const titleStyle = {
    margin: "0",
    color: "#3d84a8"
  };
  const buttonStyle = {
    backgroundColor: "#abedd8",
    border: "none",
    padding: "8px",
    borderRadius: "8px"
  };

  return (
    <div style={containerStyle}>
      <p style={titleStyle}>- Inline Styles -</p>
      <button style={buttonStyle}>Fight!</button>
    </div>
  );
};
```

## CSSモジュール

CSSファイルをモジュール化して、コンポーネントとして読み込んでCSSを当てる方法。ライブラリは不要。

- 以下のようにSCSSファイルを用意
- 純粋なCSSファイルなので、Sassも使える
- ファイル名は必ず◯◯.module.scss(css)とする

```scss
.container {
  border: solid 2px #392eff;
  border-radius: 20px;
  padding: 8px;
  margin: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
};
.title {
  margin: 0;
  color: #3d84a8;
};
.button {
  background-color: #abedd8;
  border: none;
  padding: 8px;
  border-radius: 8px;
};
```

```jsx
//CSSモジュールを読み込んで、適当な変数名に入れる
import classes from "./CssModules.module.scss";

// 変数名の中のクラス名を参照することでCSSをあてることができる
export const CssModules = () => {
  return (
    <div className={classes.container}>
      <p className={classes.title}>- CssModules -</p>
      <button className={classes.button}>Fight!</button>
    </div>
  );
};
```

## Styled JSX (CSS in JS)

JavaScriptの中でCSSを記述する方法

ライブラリをインストール

```json
"styled-jsx": "5.0.2"
```

styleタグをコンポーネントの中に配置する。jsxの記載もする。

```jsx
<style jsx="true"></style>
```

styleタグの中にCSSを書いていく。ブラケットとバッククオートで囲む。通常のCSSの書き方でOK。

```jsx
export const StyledJsx = () => {
  return (
    <>
      <div className="container">
        <p className="title">- StyledJsx -</p>
        <button className="button">Fight!</button>
      </div>
      <style jsx="true">{`
        .container {
          border: solid 2px #392eff;
          border-radius: 20px;
          padding: 8px;
          margin: 8px;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .title {
          margin: 0;
          color: #3d84a8;
        }
        .button {
          background-color: #abedd8;
          border: none;
          padding: 8px;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};
```

## Styled Component

styleを当てたコンポーネントを作ることができる。

ライブラリをインストール

```json
"styled-components": "5.3.5",
```

- importで読み込む
- style付きのコンポーネントを定義する
- 定義したコンポーネントで置き換える

```jsx
//importで読み込む
import styled from "styled-components";

export const StyledComponent = () => {
  return (
    <>
      <SContainer>
        <STitle>- StyledComponent -</STitle>
        <SButton>Fight!</SButton>
      </SContainer>
    </>
  );
};

//style付きのコンポーネントを定義する。
//styleを当てたコンポーネントなのか、そうでないのか区別できるようにすると便利
//記法はCSS/Sassにならうことができる
const SContainer = styled.div`
  border: solid 2px #392eff;
  border-radius: 20px;
  padding: 8px;
  margin: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const STitle = styled.p`
  margin: 0;
  color: #3d84a8;
`;

const SButton = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;
```

## emotion

さまざまな方法でCSSをあてることのできるライブラリ

用途に応じて、ライブラリをインストール

```json
"@emotion/react": "11.9.0",
"@emotion/styled": "11.8.1",
```

```jsx
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

export const Emotion = () => {
  //方法１ styleをcssライクに書くことができる
  const containerStyle = css`
    border: solid 2px #392eff;
    border-radius: 20px;
    padding: 8px;
    margin: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `;
  //方法２ inline-styleっぽくもかける
  const titleStyle = css({
    margin: "0",
    color: "#3d84a8"
  });
  return (
    <div css={containerStyle}>
      <p css={titleStyle}>- Emotion -</p>
      <SButton>Fight!</SButton>
    </div>
  );
};

//方法3 styled-componentっぽくかける
const SButton = styled.button`
  background-color: #abedd8;
  border: none;
  padding: 8px;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;
```
