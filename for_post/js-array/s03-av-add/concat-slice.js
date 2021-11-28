var a = [1, 2, 3, 7, 8, 9];
 
a = a.slice(0, 3).concat([4, 5, 6], a.slice(3, 6));
 
console.log(a); // [1,2,3,4,5,6,7,8,9]