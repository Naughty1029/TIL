jQueryの$._dataを使うと取得できる

```javascript
$(function(){
    $("#app").on("click",()=>alert("hello"));
    //イベントハンドラが取得できる
    let events = $._data($("#app").get(0),"events");
    console.log(events);
})
```
