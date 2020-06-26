for (var i = 1; i <= 100; i++) {
    var output = '';
    if (i % 3 == 0) {
        console.log('Fizz');
    }
    if (i % 5 == 0) {
        console.log('Buzz');
    }
    if ((i % 3 != 0) && (i % 5!= 0)) {
        console.log(i);
    }
}
