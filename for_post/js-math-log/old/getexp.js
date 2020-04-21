var getExp = function(num, base){
    return Math.log(num) / Math.log(base);
};
 
var exp = getExp(1000,10);
 
console.log(exp); // 2.99...
 
console.log(Math.pow(10,exp)); // 999.99...