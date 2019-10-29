// a plain old object
// with numbered keys and
// a length property
var obj = {
    2: 'array',
    4: 'length',
    6: 'in',
    8: 'javaScript',
    length: 10
};

// creating an array from this object
var arr = Array.from(obj),

// getting the length value
len = arr.length,

// getting the count value by way of a
// certain method
count = arr.filter(function (el) {
        return !!el ? el : false;
    }).length,

// setting an index value
index = 2,

// using that index value to get an element
el = arr[index];

console.log(arr.length, count, index, el);
 // 10 4 2 'array'
