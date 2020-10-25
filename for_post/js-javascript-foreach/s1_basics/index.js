
let values = [100, 20, 50, 75],
min = Math.min.apply(null, values),
max = Math.max.apply(null, values),
points = [];

values.forEach((num, i, val) => {
    points.push({
        x: 320 / val.length * i,
        y: (num - min) / (max - min) * 240
    });
});

console.log(points);



/*
let a = [2, 5, 10],
b = [];
a.forEach((n, i) => {
b.push( Math.pow(n, i) );
});
console.log(b); // [1, 5, 100]
)
*/
