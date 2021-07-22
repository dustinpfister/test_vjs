// have x, return y
var getY = function(x){
    return 5 * x - 7;
};
// have y, return y
var getX = function(y){
   return ( y + 7 ) / 5;
};

// The functions can be used to get
// whatever the unknown is for a given known

// have y to get x
var x = getX(42);
var y = getY(x);
console.log(x); // 9.8
console.log(y); // 42

// have x to get y
var y = getY(9.8);
var x = getX(y);
console.log(x); // 9.8
console.log(y); // 42
