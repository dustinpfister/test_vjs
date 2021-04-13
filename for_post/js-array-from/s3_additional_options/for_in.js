var obj = {
    baz: '3',
    foo: '1',
    bar: '2'
};

var arr = [];
for (var key in obj) {
    var value = obj[key];
    arr.push(parseInt(value, 10));
}
console.log(arr); // [3,1,2]
