# What Today I Learned...
For associative array  
Before ES6 we use object.  
After ES6 we use Map object for associative array. 

## How to create Map Object
```javascript
const myMap = new Map();

//set key and value
myMap.set("id",3);
myMap.set("name","honda");

//This is just Object
obj = {
    "id":3,
    "name":"honda"
}

console.log(myMap);//Map(2) {'id' => 3, 'name' => 'honda'}
console.log(obj);//{id: 3, name: 'honda'}
```

Map object can use for `for-of Loop`. 

```javascript
for (const iterator of myMap) {
    console.log(iterator);//(2) ['id', 3],(2) ['name', 'honda']
}
for (const iterator of obj) {
    console.log(iterator);//Uncaught TypeError: obj is not iterable
}
```

## Difference between for-of and foreach
### for-of
- Iterable elements can be looped.
- ES6
- Object can not be looped.
- Can loop through String, Array, Map, NodeList, and many other things.

### forEach
- Methods defined in Array.prototype
- it is not a loop syntax, but just a method.
- can't stop the loop process in the middle.

Foreach cannot `break` or `continue`.
You can use `return` as an alternative to continue.

```javascript
Object.keys(obj).forEach(function(key) {
    console.log(index);  // Run three times
    if (1 < index) {
        return;
    }
    console.log(elem);  // Run two times
});
```

## Reference Links
I learned from the following links. Thank you very much.
- (【javaScript】for…in、for…of、forEachの違いと用途)[https://web-begginer-log.com/js_for/]
- https://wemo.tech/2109#index_id2
