

let objs = [{
        clicks: 15
    }, {
        clicks: 10
    }, {
        clicks: 25
    }
];

let a = objs.reduce(function (acc, rec, index) {
        acc = typeof acc === 'object' ? acc.clicks : acc;
        console.log(index); // 1 2
        return acc + rec.clicks;
    });

let b = objs.reduce(function (acc, rec, index) {
        console.log(index); // 0 1 2
        return acc + rec.clicks;
    }, 0);

console.log(a); // 50
console.log(b); // 50
