var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
// creating a custom toString method for the array
a.toString = function(){
    return this.map(function(obj){
        return '{x:'+ obj.x + ',y:' + obj.y + '}';
    }).join(',');
};
// calling toString will now work the way I want it to
console.log( a.toString() );
// {x:42,y:12},{x:0,y:0},{x:12,y:35}