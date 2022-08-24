Example 1:
```
Input: nums = [3,2,3]
Output: 3
```
Example 2:
```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

```javascript
export const sortValue = ()=> {

  let array = [3,2,3];
  let setArr = new Set(array);
  let filterArr =  Array.from(setArr);
  
  let obj = {};

  for (const iterator of filterArr) {
    const copyArr = [...array];
    const box = copyArr.filter(copy => copy === iterator);
    obj[iterator] = box.length;
  }
  const Numbers = Object.values(obj);
  Numbers.sort((a,b)=> b-a);
  let num = Numbers[0];

  console.log(getKeyByValue(obj,num));
  return getKeyByValue(obj,num);

  function getKeyByValue(obj, num) {
    return Object.keys(obj).find((key) => {
      return obj[key] === num
    });
  }
}
```