var a = [1, 2, 3, 4],
// just make a new array
b = new Array();
// and add all the elements from the source array
a.forEach(function (n, i) {
    b[i] = n;
});
a[0] = 'a';
console.log(a.join());
// 'a,2,3,4'
console.log(b.join());
// '1,2,3,4'
