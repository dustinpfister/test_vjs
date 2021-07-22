var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
// creating a new array b from a
var b = a.map(function(obj){
    return '{x:'+ obj.x + ',y:' + obj.y + '}';
});
// and then calling toString off of b
console.log( b.toString() );
// {x:42,y:12},{x:0,y:0},{x:12,y:35}