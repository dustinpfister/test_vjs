// simple pure function using a declaration
function area(w, h) {
    w = w === undefined ? 0 : w;
    w = w === undefined ? 0 : w;
    return w * h;
};
// an example of a function that is not a pure function
function randomArea(sx, sy, mw, mh){
    var w = Math.round(Math.random() * mw),
    h = Math.round(Math.random() * mh);
    return {
        x: sx + Math.floor((mw - w) * Math.random()),
        y: sy + Math.floor((mh - h) * Math.random()),
        w: w,
        h: h
    };
};
// a pure function will always give the same result
// for the same arguments
console.log( area(10, 10) ); // 100
// if not then it is not a pure function
console.log(randomArea(10, 10, 10, 10)); // (an object with random props each time)