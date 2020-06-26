var fizzer = function (i, m, mess) {
    if (i % m === 0) {
        return mess;
    }
    return '';
}

for (var i = 1; i <= 100; i++) {
    var output = '';
    output += fizzer(i, 3, 'Fizz');
    output += fizzer(i, 5, 'Buzz');
    if (output === '') {
        output = i;
    }
    console.log(output);
}
