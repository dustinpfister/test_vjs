let obj = {n:42},
ref = obj;
 
// if both operands are references to the same object that is true
 console.log(obj == ref); // true
 
// else it is not true
console.log(obj == {n:42}); // false