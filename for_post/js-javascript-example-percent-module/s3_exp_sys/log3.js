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

            // new log3 where we just add a
            return Math.log(1 + per) / Math.log(2 + a);

            // old log3 where we use per with a
            //return clamp(Math.log(1 + per) / Math.log(a - (a - 2) * per));

        },
        getN: function (per, d, a) {
            a = a === undefined ? 12 : a;
;
            // new log3 where we just add a
            var base = 2 + a;
            return Math.round((Math.pow(base, 1 + per) / base - 1) * d);

            // old log3 where we use per with a
            //var base = Math.pow(Math.E, a - (a - 2) * per);
            //return Math.round((Math.pow(base, 1 + per) / base - 1) * d);
        }
    };
}
    ());

// test - the result of getN should equal the original value of n
var testForN = function (n, d) {
    var per = log3.getPer(n, d),
    n2 = log3.getN(per, d),
    result = n === n2;
    console.log(n, n2, n === n2);
    return result;
};

testForN(5, 10);

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
