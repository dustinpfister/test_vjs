var a = [1,2,3,4,5,6];
a = a.map(function(n){
   return Math.pow(2,n);
});
 
console.log(a); // [2,4,8,16,32,64]