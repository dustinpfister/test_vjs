// get an point in an area with a width height, and 
// values between 0 and 1.
var getAreaPoint = function (w, h, wPer, hPer) {
    return {
        x: Math.floor(w * wPer),
        y: Math.floor(h * hPer)
    };
};
// random point
var getRandomAreaPoint = function (w, h) {
    return getAreaPoint(w, h, Math.random(), Math.random());
};
// demo
var i = 10;
while(i--){
    console.log( getRandomAreaPoint(10, 10) );
};