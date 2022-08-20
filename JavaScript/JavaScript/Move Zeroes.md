Example 1:
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```
Example 2:
```
Input: nums = [0]
Output: [0]
```

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
export const moveZeroes = (nums:number[])=> {
  let zeroes = 0;
  for (let index = 0; index < nums.length; index++) {
    
    if(nums[index] === 0){
      nums.splice(index,1);
      zeroes++;
      index--;
    }
  }
  for (let index = 0; index < zeroes; index++) {
    nums.push(0);
  }
  return nums;//test用
};
```

test code

```javascript
import { moveZeroes } from "./App";

test.each([
  [[0,1,0,3,12],[1,3,12,0,0]],
  [[0],[0]],
])("moveZeroes(array)",(a,expected)=>{
  expect(moveZeroes(a)).toEqual(expected);
})
```