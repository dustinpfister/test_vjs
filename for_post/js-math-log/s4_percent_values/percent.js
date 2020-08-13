var genPerValues = function (n, d, base) {
    var per = n / d;
    base = base || 2;
    return {
        per: per,
        perLog: Math.log(1 + per * (base - 1)) / Math.log(base)
    }
};

var a = genPerValues(25, 50, 2);
console.log(a.per);
console.log(a.perLog);
// 0.5
// 0.5849625007211562

var a = genPerValues(25, 50, 16);
console.log(a.per);
console.log(a.perLog);
// 0.5
// 0.7718657103125849
