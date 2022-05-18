## jQuery.Deferredを使う
```javascript
function main(){
    // DOMの操作は同期的に行われるため$.whenを利用する必要はない。
    $('最初からある要素').append('追加したいimg要素')

    // 追加されたそれぞれの要素をDeferred化し全てのロードが完了するのを$.whenで待つ
    $.when.apply($, $('追加したimg要素').map(waitForLoading)).then(function(){
        // ロード完了後に行う処理
    })

}
function waitForLoading(index, img){
    var dfd = $.Deferred()

    // img要素のロード完了はimg.completeで取得できます。
    if(img.complete){
        // すでにロードが完了していれば即時resolve。
        dfd.resolve()
    } else {
        // ロードが完了していなかった場合、イベントリスナー登録しロードの完了を待つ
        $(img).on('load', function(){
            dfdresolve()
        })
    }
    return dfd
}
```

## async, awaitを使う
```javascript
async function main(){
    //ここで画像の追加
    await Promise.all(Array.from(document.querySelectorAll('追加したimg要素')).map(waitForLoading))
    // ロード完了後に行う処理
}
function waitForLoading(img){
    return new Promise(resolve => {
        if(img.complete){
            resolve()
        } else {
            img.addEventListener('load', () => resolve())
        }
    })
}
```
