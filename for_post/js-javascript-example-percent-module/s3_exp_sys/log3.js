var log3 = (function () {
    // CLAMP
    var clamp = function (per) {
        if (per > 1) {
            return 1;
        }
        if (per < 0) {
            return 0;
        }
        return per;
    };
    // BASIC percent methods
    var basic = {
        getPer : function(n, d){
            return clamp(n / d);
        },
        getN : function(per, d){
            return per * d;
        }
    };
    return {
        getPer : function(n, d, a, basePer, maxPer){
/*
            basePer = basePer === undefined ? 0.10 : basePer;
            maxPer = maxPer === undefined ? 1 : maxPer;
            a = a === undefined ? 12 : a;
            var per = basic.getPer(n, d),
            per2 = clamp(Math.log(1 + per) / Math.log(a - (a - 2) * per)),
            range = maxPer - basePer;
            return clamp( basePer + range * per2 );
*/
            return basic.getPer(n, d);
        },
        getN : function(per, d){
            return basic.getN(per, d);
        }
    };
}
    ());

// test
var n = 5,
d = 10,
per = log3.getPer(n, d),
n2 = log3.getN(per, d);

console.log( 'n=' + n, 'd=' + d, 'per=' + per, 'n2=' + n2);
console.log( 'n == n2 : ' + (n === n2) );
