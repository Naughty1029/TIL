Example 1:
```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

Example 2:
```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
	  if (!strs[0] || strs.length ==  1) return strs[0] || "";
	  let i = 0;

	  while(strs[0][i] && strs.every(s => s[i] === strs[0][i])){
		  i++;
	  }
		//文字列は配列みたいに一文字ずつ取得可能
	  console.log(strs[0][0]);

	  // iの数分だけ文字列を切り出す
	  return strs[0].substr(0, i);
};

longestCommonPrefix(["cir","car"])
```

https://stackoverflow.com/questions/68702774/longest-common-prefix-in-javascript