var arr = [1,2,3,4];

console.log( arr.splice(arr.length-1, 1)[0] ); // 4
console.log( arr.splice(0, 1)[0] ); // 1
console.log( arr ); // [2,3]