# js-array-fill todo list

### () - new av-fill-module
* start a fill module
* a Fill prim method
* a Fill range method
* a Fill random method
* a Fill randomFromSections method

### () - expand av-fill-with-string
* 4-match


### () - new av-pollyfill-ponyfill section

```js
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var finalValue = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < finalValue) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}
```

### () - expand and rename av-apply-map
* have an example that showcases the problem using Array constructor with new keyword and map
* have a apply example with a plain object to help better show what the situation is

### ( done 12/20/2021 ) - new av-array-from section
* (done) 1-array-from

### ( done 11/26/2021 ) - expand and rename av-string-split
* (done) rename av-string-split to av-fill-with-string
* (done) 1-split
* (done) 2-split-comma
* (done) 3-split-map-join

### ( done 11/26/2021 ) - expand av-while - fill higher order function, and filler methods
* (done) 5-while-higher-order example

### ( done 11/26/2021 ) - expand av-while
* (done) fill range example using a while loop
* (done) 3-while-range example
* (done) 4-while-random example

