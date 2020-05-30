var arr = [1,2,3,4];

console.log( arr.splice(arr.length-1, 1)[0] ); // 4
console.log( arr.splice(0, 1)[0] ); // 1
console.log( arr ); // [2,3]

// splice can also be used to inject new elements
arr.splice(1,0, 2.1, 2.2);

console.log(arr); // [2, 2.1, 2.2, 2.3, 3]