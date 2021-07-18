var arr = [2, 3, 16, 7, 9, 128];
var pow2 = arr.filter(function (n) {
    return String(Math.log(n) / Math.log(2)).indexOf('.') == -1;
});
 
console.log(arr); // [2,3,16,7,9,128]
console.log(pow2); // [2,16,128]