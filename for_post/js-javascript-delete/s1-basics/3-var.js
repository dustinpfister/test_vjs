// can not delete variables (in nodejs)
var n = 42;
delete n;
console.log(n); // 42
 
// but can delete a property
this.n = 42;
console.log(this.n); // 42
delete this.n;
console.log(this.n); // undefined

