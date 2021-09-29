var arr = [16, 32];
arr.push(64, 128, 256)

console.log(arr.join('-')); // '16-32-64-128-256'

var b = [1, 2, 3];
[].push.apply(b, [4, 5, 6]);

console.log(b.join('-')); // '1-2-3-4-5-6'
