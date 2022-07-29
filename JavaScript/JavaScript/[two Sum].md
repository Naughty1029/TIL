オブジェクトを利用して時間計算量を削減します。{ nums[index]: index }といった形式のオブジェクトを用意し、target - nums[i]の値がプロパティに含まれているかチェックします。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 const twoSum = (nums, target) => {
	let hashTable = {}

	for (let i = 0; i < nums.length; i++) {
	  hashTable[nums[i]] = i
	}
	console.log(hashTable);
	for (let i = 0; i < nums.length; i++) {
	  const diff = target - nums[i]
	  console.log(diff);
	  if (hashTable.hasOwnProperty(diff) && hashTable[diff] !== i) {
		return [i, hashTable[diff]]
	  }
	}
  }

twoSum([2,7,11,15],9)
```

https://blog.shinki.net/posts/algorithm-two-sum-javascript