var str = ' 2 + 2 ';
// Using the Function constructor
var func = new Function('return ' + str);
console.log(func()); // 4