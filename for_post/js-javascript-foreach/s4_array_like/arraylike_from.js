let obj = {0:1, 1:2, 2:3, length: 3};
 
// Using Array.from can help change an array like
// object into an array
let arr = Array.from(obj);
console.log(arr.constructor.name); // 'Array'
 
// Now we have the methods
let sum = 0;
arr.forEach((n)=>{ sum += n; });
console.log(sum); // 6