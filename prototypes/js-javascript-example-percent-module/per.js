
var Percent = (function () {

    // main api function
    var api = function(n, d, methodKey, args){
        return api[methodKey].apply(null, [n,d].concat(args));
    };

    // basic percent function
    api.basePer = function(n, d){
        return n / d;
    };

    // 'bias' percent function
    api.bias = function(n, d){
        var per = api.basePer(n, d);
        return 1 - Math.abs(per - 0.5) / 0.5;
    };

    return api;
}
    ());

var per = Percent(1, 5, 'basePer', []),
bias = Percent(3, 5, 'bias', []);

console.log( per ); // 0.2
console.log( bias ); // 0.2