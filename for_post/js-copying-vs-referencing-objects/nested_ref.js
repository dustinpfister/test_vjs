// start out with an object with
// a nested object
var source = {
    pos: {
        x: 40,
        y: 25
    },
    heading: 1.57
},
// create a whole new object
copy = {};
// populate the new object with the keys
// from the source object
Object.keys(source).forEach(function (key) {
    copy[key] = source[key];
});

// mutating the copy
copy.heading = 0;
copy.pos.x = 0;

// works as exspected when it comes to heading
console.log(copy.heading, source.heading); // 0 1.57
// does not work with pos because it just copied a
// reference it did not deep clone
console.log(copy.pos.x, source.pos.x); // 0 0
