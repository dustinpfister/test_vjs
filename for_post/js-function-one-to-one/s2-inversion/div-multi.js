// get y if x is known
var getY = function(x){
    return x * 5;
};
// get x if y is known
var getX = function(y){
    return y / 5;
};

var a = [1,2,3,4,5].map(getY);
console.log(a);

var b = a.map(getX);
console.log(b);