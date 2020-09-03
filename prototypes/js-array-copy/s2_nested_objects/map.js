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

// like slice array map will also return
// a new array rather than mutating the
// array it is called off of
var b = a.map(function (obj) {
        // returning a new Object
        // for each element
        return {
            i: Math.pow(obj.i, 2)
        }
    });
// so now we have two arrays, and with two
// independent sets of objects
console.log(a[3].i); // 4
console.log(b[3].i); // 16