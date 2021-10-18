var str = 'Hello Word'
var a = [].slice.apply(str, [6, 10]);
console.log(a);
// [ 'W', 'o', 'r', 'd' ]