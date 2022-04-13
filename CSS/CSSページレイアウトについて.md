## CSSによるページレイアウト
CSSを使うことで、Webページのさまざまな要素の位置を制御することができます。<br>
「位置を制御」する方法にもいくつかあり、代表的なものとしては下記があります。

- 通常フロー
- フレックスボックス
- グリッド
- フロート（ほとんど使わない）
- 位置指定（position）
- 表レイアウト(table)

## 通常フロー
CSSを何も適用していない場合、Webページ上の要素は通常のHTMLのフローで表示される。<br>
デフォルトでは、ブロックレベル要素のコンテンツは、その親要素の幅の100%で、そのコンテンツと同じ高さ。<br>
インライン要素は、コンテンツと同じ高さで、コンテンツと同じ幅です。インライン要素に幅や高さを設定することはできない。<br>
インライン要素のサイズを制御したい場合は、display: block; を使用してブロックレベル要素のようにふるまうように設定する必要があります (あるいは、display: inline-block; で、両方の特性を混在させる)。




## 参考記事
- [CSS レイアウト入門](https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Introduction)
- [フレックスボックス](https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Flexbox)
- [6歳娘「パパ、flexにしたら幅が余っちゃったよ・・・」](https://qiita.com/Yametaro/items/a04032349c46dddf8cda)
