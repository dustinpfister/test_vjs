// start out with a simple object
var source = {x: 32,y: 50},
// create a whole new object
copy = {};
// populate the new object with the primitives
// from the source object
Object.keys(source).forEach(function (key) {
    copy[key] = source[key];
});

copy.x += 8;

console.log(copy.x, source.x); // 40 32
