var a = [1,2,3];
console.log(a.length); // 3

console.log( a[0]); // 1
console.log( a[2]); // 3

var a = Array.from({
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    });
 
console.log(a.length); // 3
