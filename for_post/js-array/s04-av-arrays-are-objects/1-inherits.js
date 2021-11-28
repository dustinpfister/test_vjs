var arr = [1, 2, 3, 4];
 
console.log(arr.hasOwnProperty('0')); // true
console.log(arr.hasOwnProperty('4')); // false
 
Object.prototype.foo = function () {
 
    return 'bar';
 
};
 
console.log(arr.foo()); // 'bar'