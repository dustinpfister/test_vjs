var process = function (str) {
    if (str === 'bar') {
        console.log('foobar');
    } else {
        throw {
            message: 'must give bar',
            name: 'NoBarError'
        };
    }
};

try {
    process('foo');
} catch (e) {
    console.log(e.message); // 'must give bar'
}
