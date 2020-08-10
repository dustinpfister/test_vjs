
var linPerToArcPer = function (linPer) {
    return 1 - Math.abs(Math.cos(Math.PI * linPer));
};

console.log( linPerToArcPer(1) );
