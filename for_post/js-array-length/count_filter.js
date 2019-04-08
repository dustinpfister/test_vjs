let count = (arr) => {
    return Object.keys(arr).filter((key) => key >= 0).length;
}

// empty array with a length of 100
let a = new Array(100);

// three numbered keys
// above zero and below length
// with one declared by undefined
// element
a[49] = 'foo';
a[70] = 'bar';
a[71] = undefined;

// some named keys
a[-1] = 'oh boy';
a['foo'] = 'bar'

// count works as expected compared to actual key length
console.log(count(a)); // 3
console.log(Object.keys(a).length); // 3
