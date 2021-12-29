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
