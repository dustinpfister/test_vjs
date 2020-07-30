var bb = function (a, b) {
    return !(
        (a.y + a.h) < b.y ||
        a.y > (b.y + b.h) ||
        (a.x + a.w) < b.x ||
        a.x > (b.x + b.w))
};

var box = {x:50,y:50,w:100,h:50};
console.log( bb(box,{x: 75,y:75,w:1,h:1}) ); // true
console.log( bb(box,{x: 5,y:5,w:1,h:1}) ); // false
