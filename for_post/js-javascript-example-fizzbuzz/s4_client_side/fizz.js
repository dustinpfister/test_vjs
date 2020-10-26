// fizzer
var fizz = {};
fizz.fizzer = function (i, m, mess) {
    if (i % m === 0) {
        return mess;
    }
    return '';
}
// create array
fizz.createFizzBuzzArray = function (len) {
    len = len || 100;
    var arr = [];
    for (var i = 1; i <= len; i++) {
        var output = '';
        output += fizz.fizzer(i, 3, 'Fizz');
        output += fizz.fizzer(i, 5, 'Buzz');
        if (output === '') {
            output = i;
        }
        arr.push({
            i: i,
            output: output
        });
    }
    return arr;
};
