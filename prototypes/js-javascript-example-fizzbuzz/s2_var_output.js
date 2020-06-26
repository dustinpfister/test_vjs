for (var i = 1; i <= 100; i++) {
    var output = '';
    if (i % 3) {
        output += 'Fizz'
    }
    if (i % 5) {
        output += 'Buzz'
    }
    if (output === '') {
        output = i;
    }
    console.log(output);
}
