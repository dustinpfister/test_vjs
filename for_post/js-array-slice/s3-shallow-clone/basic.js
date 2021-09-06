let a1 = [1,2,3,4],
a2 = a1.slice();
 
a1[1] += 5;
 
console.log(a1); // [1,7,3,4]
console.log(a2); // [1,2,3,4]