JavaScriptで生成したDOM要素にイベントを仕込みたいときは、下記のようにすると可能

```javascript
$(document).on('click','#id', function() {`
	//クリックした後の処理`
});
```
