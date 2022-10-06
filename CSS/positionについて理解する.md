参考ドキュメント  
https://developer.mozilla.org/ja/docs/Web/CSS/position
https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
https://developer.mozilla.org/ja/docs/Web/CSS/z-index

position は CSS のプロパティで、文書内で要素がどのように配置されるかを設定します。 top, right, bottom, left の各プロパティが、配置された要素の最終的な位置を決めます。

### 値
- static
既定値。要素は文書の通常のフローに従って配置される。 top, right, bottom, left, z-index プロパティの影響を受けない。

#### 通常フローに従う系
要素は文書の通常のフローに従って配置される。

- relative
top, right, bottom, left の値に基づいて**自分自身**からの相対オフセットで配置される。オフセットは他の要素の配置には影響を与えません。つまり、ページレイアウト内で要素に与えられる空間は、位置が static であった時と同じです。

#### 通常フローから外れる系
要素は文書の通常のフローから除外され、ページレイアウト内に要素のための空間が作成されない。

- absolute
要素は文書の通常のフローから除外され、ページレイアウト内に要素のための空間が作成されない。直近の位置指定要素(relative, absolute, fixed, sticky)の祖先があれば、それに対して相対配置される。最終的な位置は top, right, bottom, left の値によって決定されます。

- fixed
ビューポートによって定められた初期の包含ブロックに対して相対配置されますが、祖先の一つに transform, perspective, filter の何れかのプロパティが none 以外に設定されている場合は例外で、その場合は祖先に対して相対配置されるとしてふるまいます。最終的な位置は top, right, bottom, left の値によって決定されます。

※ルート要素 (<html>) が包含ブロックである場合、初期包含ブロックと呼ばれる矩形になります。これはビューポート (連続的なメディアの場合) またはページ領域 (ページメディアの場合) の寸法を持ちます。