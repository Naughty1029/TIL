js ならこれ
```javascript
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
```

https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value