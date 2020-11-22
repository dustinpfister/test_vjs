
var per = (function () {
    var per = function(n, d){
        return n / d;
    };
    var api = {
        per : per
    };
    return api;
}
    ());

console.log( per.per(1, 5) ); // 0.2