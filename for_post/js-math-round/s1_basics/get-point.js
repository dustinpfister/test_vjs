var getAreaPoint = function (w, h, wPer, hPer) {
    return {
        x: Math.floor(w * wPer),
        y: Math.floor(h * hPer)
    };
};

var getRandomAreaPoint = function (w, h) {
    return getAreaPoint(w, h, Math.random(), Math.random());
};

var i = 10;
while(i--){
    console.log( getRandomAreaPoint(10, 10) );
};