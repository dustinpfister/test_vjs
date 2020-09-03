var a = [1, 2, 3, 4],
b = a.slice(0, a.length);
a[0] = 'a';
console.log(a.join());
// 'a,2,3,4'
console.log(b.join());
// '1,2,3,4'