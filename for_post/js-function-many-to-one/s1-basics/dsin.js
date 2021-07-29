var dSin = function(d){
    return Math.sin(Math.PI / 180 * d);
};
// two values for the independent variable d
// will result in the same dependent value being returned
console.log( dSin(90) );  // 1
console.log( dSin(450) ); // 1