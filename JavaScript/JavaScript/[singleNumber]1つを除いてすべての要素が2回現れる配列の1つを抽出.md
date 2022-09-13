Example 1:

```
Input: nums = [2,2,1]
Output: 1
```

Example 2:

```
Input: nums = [4,1,2,1,2]
Output: 4
```

Example 3:

```
Input: nums = [1]
Output: 1
```

my Answer

```typescript
export const singleNumber = function (nums: number[]) {
  const stack: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const indexNum = stack.indexOf(nums[i]);
    if (indexNum === -1) {
      stack.push(nums[i]);
    } else {
      stack.splice(indexNum, 1);
    }
  }
  return stack[0];
};

//nums = [4,1,2,1,2]
//stack = [];
//indexOf -1 = push(4)する
//[4,1,2]
//1がくるstackにあるからそれをstack.splice
//return stack[0]
```

テストコード

```javascript
import { singleNumber } from "./App";

describe("関数singleNumberのチェック", () => {
  test.each([
    [3, 1, 1, 3],
    [4, 2, 2, 4],
    [1, 1, 2, 2],
  ])("test(%d,%d,%d)", (a, b, c, expected) => {
    expect(singleNumber([a, b, c])).toBe(expected);
  });
});
```
