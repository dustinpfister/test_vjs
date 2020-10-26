// fizzer
var fizzer = function (i, m, mess) {
    if (i % m === 0) {
        return mess;
    }
    return '';
}
// create array
var createFizzBuzzArray = function (len) {
    len = len || 100;
    var arr = [];
    for (var i = 1; i <= len; i++) {
        var output = '';
        output += fizzer(i, 3, 'Fizz');
        output += fizzer(i, 5, 'Buzz');
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

var arr = createFizzBuzzArray(100);
var html = arr.map(function (result) {
    return '<p>' + result.i + ' : ' + result.output + '<\/p>';
}).join('');

console.log(html);