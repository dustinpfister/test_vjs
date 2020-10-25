
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
// [ { x: 0, y: 240 },
//   { x: 80, y: 0 },
//   { x: 160, y: 90 },
//   { x: 240, y: 165 } ]
