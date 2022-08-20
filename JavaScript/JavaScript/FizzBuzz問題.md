
Example 1:
```
Input: n = 3
Output: ["1","2","Fizz"]
```

Example 2:
```
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```
Example 3:
```
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
```

```javascript
export const fizzBuzz = function(num:number) {
  const stack:string[] = [];
  for (let index = 1; index < num + 1; index++) {
    if (index % 15 === 0) {
      stack.push("FizzBuzz");
    }else if(index % 3 === 0){
      stack.push("Fizz");
    }else if(index % 5 === 0){
      stack.push("Buzz");
    }else{
      stack.push(index.toString());
    }
  }
  return stack;
};
```

test code
```javascript
import { fizzBuzz } from "./App";

test.each([
  [1,["1"]],
  [3,["1","2","Fizz"]],
  [15,["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]],
])("fizzbuzz(%d)",(a,expected)=>{
  expect(fizzBuzz(a)).toEqual(expected);
})
```