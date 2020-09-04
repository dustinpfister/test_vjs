var x = 0, t;
var loop = function () {
 
    t = setTimeout(loop, 30);
    console.log('x=' + x);
    x += 10;
 
    // clear timeout
    if (x >= 100) {
        clearTimeout(t);
    }
 
};
loop();