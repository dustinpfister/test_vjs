var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];

var b = a.map(function(obj){
    return '{x:'+ obj.x + ',y:' + obj.y + '}';
});
console.log( b.toString() );
// {x:42,y:12},{x:0,y:0},{x:12,y:35}