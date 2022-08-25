Example 1:
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```
Example 2:
```
Input: list1 = [], list2 = []
Output: []
```
Example 3:
```
Input: list1 = [], list2 = [0]
Output: [0]
```

```javascript
export const mergeTwoSortedLists = (
  array1:Array<number|null>,
  array2:Array<number|null>
)=> {
  const array3 = array1.concat(array2);
  if(array3.length > 1){
    array3.sort( (a,b) => {
      return a! - b!;
    });
  }
  return array3;
}
```

```javascript
describe('test',()=>{
  test('majority',()=>{
    let list1:Array<number|null> = [1,2,4],
        list2:Array<number|null> = [1,3,4]
    expect(mergeTwoSortedLists(list1,list2)).toEqual([1,1,2,3,4,4]);
  })
})
```