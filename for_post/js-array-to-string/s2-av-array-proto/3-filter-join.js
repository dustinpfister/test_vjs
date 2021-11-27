var a = [
    false,
    null,
    {x: 2, y: 5},
    'foo',
    42,
    {},
    {x:5, y: 20}
];
// using filter, map, and join
var str = a.filter(function(el){
    if(typeof el === 'object' && el != null){
        return el.x != undefined && el.y != undefined;
    }
    return false;
}).map(function(el){
    return el.x + ',' + el.y + ';'
}).join('');
 
console.log(str); // 2,5;5,20;