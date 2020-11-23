
var Percent = (function () {

    // main api function
    var api = function(n, d, methodKey, args){
        n = n === undefined ? 0 : n;
        d = d === undefined ? 100 : d;
        methodKey = methodKey === undefined ? 'basePer' : methodKey;
        args = args === undefined ? [] : args;
        return api[methodKey].apply(null, [n,d].concat(args));
    };

    // base percent function
    api.basePer = function(n, d){
        if(n >= d){
            return 1;
        }
        if(n < 0){
            return 0;
        }
        return n / d;
    };

    // 'bias' percent function
    api.bias = function(n, d){
        var per = api.basePer(n, d);
        return 1 - Math.abs(per - 0.5) / 0.5;
    };

    api.log1 = function(n, d){
        var per = api.basePer(n, d);
        return Math.log(1 + per) / Math.log(2);
    };

    return api;
}
    ());

var per = Percent(1, 5, 'basePer', []),
bias = Percent(3, 5, 'bias', []),
log1 = Percent(7, 5, 'log1', []);

console.log( per ); // 0.2
console.log( bias ); // 0.2
console.log( log1 ); // 0.2