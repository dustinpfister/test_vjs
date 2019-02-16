var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
},
sum = 0;

Array.prototype.forEach.call(obj, (n) => {
    sum += n;
});

console.log(sum);
