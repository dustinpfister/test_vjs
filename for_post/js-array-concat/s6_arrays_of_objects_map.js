
var a = [{x:0, y: 42},{x:50, y: 30},{x:75, y: 7}];
var b = [{x:20, y: 40},{x:8, y: 89},{x:63, y: 4}];

c = a.concat(b).map(function(obj){
    return {
        x: obj.x,
        y: obj.y
    };
});

c[0].x=99;
c[0].y=99;
console.log(a[0], c[0]);
// { x: 0, y: 42 } { x: 99, y: 99 }