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
        getPer : function(n, d, a){
            a = a === undefined ? 12 : a;
            var per = basic.getPer(n, d);
            //return clamp(Math.log(1 + per) / Math.log(a - (a - 2) * per));
            return Math.log(1 + per) / Math.log(2);

        },
        getN : function(per, d, a){
            // close
            //return Math.pow(1 + per, 2) * 2;
            var basicN = basic.getN(per, d)
            return Math.pow(basicN/d, 1);
        }
    };
}
    ());

// test - the result of getN should equal the original value of n
var n = 5,
d = 10,
per = log3.getPer(n, d),
n2 = log3.getN(per, d);
console.log( 'n=' + n, 'd=' + d, 'per=' + per, 'n2=' + n2);
console.log( 'n == n2 : ' + (n === n2) ); // should be true
