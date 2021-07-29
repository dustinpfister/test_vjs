var dSin = function(d){
    return Math.sin(Math.PI / 180 * d);
};
// two values for the indepandant variable d
// will result in the same depedant value being retruned
console.log( dSin(90) );  // 1
console.log( dSin(450) ); // 1
