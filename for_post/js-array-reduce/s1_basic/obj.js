let sumClicks = (objs) => {
    return objs.reduce(function (acc, rec) {
        acc = typeof acc === 'object' ? acc.clicks : acc;
        return acc + rec.clicks;
    });
};

let objs = [
    { clicks: 15, money: 0.75 },
    { clicks: 10, money: 1.50 },
    { clicks: 25, money: 3.35 }
];


console.log(sumClicks(objs)); // 24
