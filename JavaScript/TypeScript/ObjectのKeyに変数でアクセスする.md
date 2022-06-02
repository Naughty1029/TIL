参考リンク  
https://qiita.com/nazeudon/items/2faf4d64e29b7bf8bc9f

## やりたいこと
以下のような、
object2のcategoryのvalueと、object1のkeyが一致するvalueの配列に、object2をまるっとpushしたい。object3のようになるイメージ。

```javascript
const object1 = {
  category1: [],
  category2: []
}

const object2 = {
  id: 1,
  title: "nazeudon",
  category: "category1",
}

const object3 = {
  category1: [
    {
      id: 1,
      title: "nazeudon",
      category: "category1",
    },
  ],
  category2: []
}
```

## JavaScriptだとこう書ける
とてもシンプル。まさに。Simple is the Best.

```javascript
const cat = object2.category;
object1[cat].push(object2);
```
## ハマったポイント
同じことをTypeScriptでやろうとすると。。。

```typescript
const cat = object2.category;
object1[cat].push(object2);
```
>Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ category1: never[]; category2: never[]; }'.
  No index signature with a parameter of type 'string' was found on type '{ category1: never[]; category2: never[]; }'.(7053)

>要素は暗黙のうちに 'any' 型を持っています。なぜなら、型 'string' の式は型 '{ category1: never[]; category2: never[]; }' をインデックス化するために使用できないからです。
type '{ category1: never[]; category2: never[]; }' には、型 'string' のパラメータを持つインデックスシグネチャが見つかりませんでした。

`interface`で型付けしてみる

```typescript
interface OBJECT1 {
  category1: OBJECT2[]
  category2: OBJECT2[]
}

interface OBJECT2 {
  id: number
  title: string
  category: string
}

const object1: OBJECT1 = {
  category1: [],
  category2: []
}

const object2: OBJECT2 = {
  id: 1,
  title: "nazeudon",
  category: "category1",
}

const cat = object2.category;
object1[cat].push(object2);
```
>Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'OBJECT1'.
  No index signature with a parameter of type 'string' was found on type 'OBJECT1'.(7053)

>要素は暗黙のうちに 'any' 型を持っていますが、それは 'string' 型の表現が型 'OBJECT1' のインデックスに使用できないからです。
  型 'OBJECT1' の型 'string' のパラメータを持つインデックス・シグネチャは見つかりませんでした。

これでもダメなのね。
OBJECT1のインデックスにString型を指定できないと言われています。

ってことで、この解決に小一時間費やしたので、解決策を残しておきます。

## TypeScriptでの書き方（例）
```typescript
const cat: keyof OBJECT1 = object2.category as keyof OBJECT1;
object1[cat].push(object2);
```

こんな感じで、`cat`変数と`object2.category`を共に、OBJECT1のkeyですよ、と明示してあげれば無事動きました！！