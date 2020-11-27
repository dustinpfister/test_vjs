var log4 = (function () {
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
        getPer: function (n, d) {
            return clamp(n / d);
        },
        getN: function (per, d) {
            return per * d;
        }
    };
    // PUBLIC API
    return {
        getPer: function (n, d, a) {
            a = a === undefined ? 12 : a;
            var per = basic.getPer(n, d);
            return {
                basePer: per,
                per: clamp(Math.log(1 + per) / Math.log(a - (a - 2) * per)),
                n: n,
                d: d,
                valueOf : function(){
                    return this.per;
                }
            };
        },
        getN: function (per) {
            // cheep but it works
            return per.n;
        }
    };
}
    ());

// test - the result of getN should equal the original value of n
var testForN = function (n, d) {
    var per = log4.getPer(n, d),
    n2 = log4.getN(per, d),
    result = n === n2;
    console.log(n, n2, n === n2);
    return result;
};

//testForN(10, 10);

var n = 0,
d = 10,
result,
pass = true;
while (n <= d) {
    result = testForN(n, d);
    if (!result) {
        pass = false;
    }
    //console.log( n ,'n == n2 : ' + result );
    n += 1
}
console.log('passed? :' + pass);
