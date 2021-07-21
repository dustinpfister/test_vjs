var a = [{
        i: 1
    }, {
        i: 2
    }, {
        i: 3
    }, {
        i: 4
    }
];

// so using slice will create a new array
var b = a.slice(0, a.length);

// but it will not copy the nested objects
// just like before they are references to the same objects
a[0].i = 42;

console.log(b[0]); // 42
