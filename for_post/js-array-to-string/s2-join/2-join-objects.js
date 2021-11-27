var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
 
// using join alone will run into the same problem with toString
console.log(a.toString()); // '[object Object],[object Object],[object Object]'
console.log(a.join());     // '[object Object],[object Object],[object Object]'
 
// But join is often used in conjunction with other array methods 
// like map to help address this
var str = a.map(function(el){
    return '(' + el.x + ', ' + el.y + ') ';
}).join('');
console.log(str); // '(42, 12) (0, 0) (12, 35)'
