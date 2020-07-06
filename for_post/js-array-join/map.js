let arr = [ {a: 42}, {a: 30}, {a: 50} ];

let str = arr.map((obj) => {
    return obj.a;
}).join('-');

console.log(str); // '42-30-50'
