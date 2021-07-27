
var oneFunc = function(x){
    var i = Math.floor(x / 50);
    return {
       x: x,
       i: i,
       p: Math.pow(2, i)
    };
};

console.log( oneFunc(0) );
console.log( oneFunc(25) );
console.log( oneFunc(50) );
