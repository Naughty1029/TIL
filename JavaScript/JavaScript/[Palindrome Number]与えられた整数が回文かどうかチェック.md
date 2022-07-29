```javascript
var isPalindrome = function(x) {
  let num = x.toString();
  num = [...num];
  let copy = [...num];
  let reversed = copy.reverse();

	const isEqualArray = (array1,array2)=> {
		let i = array1.length;
		if(i !== array2.length) return false;

		while (i--) {
			if(array1[i] !== array2[i]) return false
		}
		return true
	}

	return isEqualArray(num,reversed);
};

//整数xが与えられたとき、xが回文整数であれば真を返す。
const res = isPalindrome(323);

console.log(res);
```

参考リンク先  
https://qiita.com/ba--shi/items/46e2d42ea5fb9e94926f
