var getY = function(x){
    return x * 5;
};

// say I have a domain like this
var domain = [1, 2, 3, 4, 5, 6];
// I can use array map to create a codomain
// so that I now have a y value for every value of x
var coDomain = domain.map(getY);
console.log(coDomain);
// [ 5, 10, 15, 20, 25, 30 ]