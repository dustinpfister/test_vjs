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
            return Math.round((Math.pow(2, 1 + per) / 2 - 1) * d);
        }
    };
}
    ());

// test - the result of getN should equal the original value of n
var testForN = function(n, d){
    var per = log3.getPer(n, d),
    n2 = log3.getN(per, d);
    //console.log( 'n=' + n, 'd=' + d, 'per=' + per, 'n2=' + n2);
    //console.log( n ,'n == n2 : ' + (n === n2) ); // should be true
    return n === n2;
};

var n = 0,
d = 1000,
result,
pass = true;
while(n <= d){
    result = testForN(n, d);
    if(!result){
        pass = false;
    }
    console.log( n ,'n == n2 : ' + result ); 
    n += 1
}
console.log('passed? :' + pass);