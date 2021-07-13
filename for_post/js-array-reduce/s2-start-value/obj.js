

let objs = [
    { clicks: 15},
    { clicks: 10},
    { clicks: 25}
];

// one way is to do type checking
let a = objs.reduce(function (acc, rec) {
    acc = typeof acc === 'object' ? acc.clicks : acc;
    return acc + rec.clicks;
});

// the other way is to set a custom starting value for acc
let b = objs.reduce(function (acc, rec) {
    return acc + rec.clicks;
}, 0);


console.log(a); // 50
console.log(b)
