var x = 0;
var loop = function () {
 
    setTimeout(loop, 30);
 
    console.log('x=' + x);
 
    x += 10;
    x %= 320;
 
};
 
loop();