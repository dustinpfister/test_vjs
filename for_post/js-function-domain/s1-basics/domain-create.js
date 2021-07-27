// create a domain for a function
var createDomain = function(sx, ex, step){
    var x = sx,
    domain = [];
    while(x < ex){
        domain.push(x);
        x += step;
    }
    return domain;
};
// the function that I am creating a domain for.
var func1 = function(x){
   x = x < 0 ? 0: x;
   x = x > 10 ? 10 : x;
   return x / 10;
};

// creating an array for arguments values that I
// will act as a domain
var domain = createDomain(0, 11, 1);
console.log(domain);
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

// I can now use array map with the function func1 
// to create an array or return values for the domain
console.log( domain.map(func1) );
// [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ]