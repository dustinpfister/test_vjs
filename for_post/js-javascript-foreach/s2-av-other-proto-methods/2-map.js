var arr = [1, 2, 3],
sum = 0;

arr = arr.map((n)=>{sum+=n;return Math.pow(2,n);});

console.log(sum); // 6
console.log(arr); // [2,4,8]