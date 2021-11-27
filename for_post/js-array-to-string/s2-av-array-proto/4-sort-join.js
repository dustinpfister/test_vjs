var a = [
    {x: 18, y: 75, money: 0},
    false,
    null,
    {x: 2, y: 5, money: 45},
    {x: 0, y: 0, money: 37},
    'foo',
    42,
    {},
    {x:5, y: 20, money: 100}
];
// using filter, sort, map, and join
var str = a.filter(function(el){
    if(typeof el === 'object' && el != null){
        return el.x != undefined && el.y != undefined;
    }
    return false;
}).sort(function(a, b){
    if(a.money > b.money){
        return -1;
    }
    if(a.money < b.money){
        return 1;
    }
    return 0;
}).map(function(el){
    return '$' + el.money + '(' + el.x + ',' + el.y + ');'
}).join('');
 
console.log(str); // $100(5,20);$45(2,5);$37(0,0);$0(18,75);