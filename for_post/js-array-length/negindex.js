var a = Array.from({
        0: 2,
        1: 3,
        2: 4,
        length: 3
    });
a[-1] = 1;
 
console.log(a.length); // 3
 
var b = ['a', 'b', 'c'];
 
b[-1] = '!';

console.log(b.length); // 3
console.log(Object.keys(b).length); // 4
