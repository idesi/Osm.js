# Osm.js

A modern JavaScript library which offers utility functions for objects in JavaScript.
`Osm.js` follows functional programming paradigms such as immutability & currying.
`Osm.js` methods always return a new object rather than mutating the objects passed in. This leads to consistent & predictable behavior.

## Usage
Osm.js is exported as a UMD module, which means it can work on both the client & the server.

### npm
Installing `Osm` via npm

```shell
npm install osmjs
```
Then require/import it in any module

```javascript
import osm from osmjs;
```
### Browser
To use `Osm.js` from a browser, download [lib/osm.min.js](https://github.com/idesi/Osm.js/blob/master/lib/osm.min.js)

Then, add it as a script tag to your page

```html
<script src="osm.min.js"></script>
<script>
const scores = {
  Jason: 2,
  Sam: 3,
  Jane: 1
};
const double = (v) => v * 2;
const dbl = osm.map(double, scores);
</script>
```

Or use an AMD loader such as RequireJS
```javascript
require(['./osm.min.js'], (osm) => {
  // your code here
});
```
### Documentation

#### map
```javascript
osm.map(interatee, obj);
```
Returns a new object by running `obj` through `iteratee`.

```javascript
const scores = {
  Jason: 2,
  Sam: 3,
  Jane: 1
};
const double = (v) => v * 2;
const dbl = osm.map(double, scores);
```

#### filter
```javascript
osm.filter(predicate, obj);
```

Iterates over an object & returns a new object with all values `predicate` returns truthy for. The `predicate` is invoked with two arguments: (value, key)

```javascript
const scores = {
  Jason: 2,
  Sam: 3,
  Jane: 1
};
const predicate = score => score > 1;
const highScores = osm.filter(predicate, scores);
```

### isObject
```javascript
osm.isObject(value)
```
Checks if the `value` is a plain object

```javascript
osm.isObject({}); //true
osm.isObject(''); //false
osm.isObject(0); //false
osm.isObject(null); //false
osm.isObject(undefined); //false
osm.isObject(NaN); //false
```

### clone
```javascript
osm.clone(obj);
```
Returns a new object which uses `obj` as it's prototype and clones the properties.

### extend
```javascript
osm.extend(objA, objB);
```
Returns a new object which uses own enumerable properties of source objects `objA` & `objB`. Sources are applied left to right and objA is not mutated in the process.

```javascript
const numbers = {One: 1, Two: 2, Three: 3};
const strings = {One: 'One', Two: 'Two'};
osm.extend(numbers, strings); //{One: 'One', Two: 'Two', Three: 3};
```

### omit
```javascript
osm.omit(obj, [keys]);
```
Returns a new object which doesn't contain the omitted `keys`. `Keys` must be array.

```javascript
const scores = {
  Jason: 2,
  Sam: 3,
  Jane: 1
};
osm.omit(scores, ['Jason', 'Sam']); //returns {Jane: 1}
```
