let sumObjects = (objs, prop) => {
    prop = prop === undefined ? 'clicks' : prop;
    return objs.reduce(function (acc, rec) {
        acc = typeof acc === 'object' ? acc[prop] : acc;
        return acc + rec[prop];
    });
};

let objs = [
    { clicks: 15, money: 0.75 },
    { clicks: 10, money: 1.50 },
    { clicks: 25, money: 3.35 }
];


console.log(sumObjects(objs));          // 24
console.log(sumObjects(objs, 'money')); // 5.6
