var count = (function () {

    var c = 0;

    return function (opt, n) {
        if (opt === 'get') {
            return c;
        }
        c = opt === undefined || opt === 'count' ? c += 1 : c;
        c = opt === 'reset' ? 0 : c;
        c = opt === 'set' ? n : c;
        return c;
    };

}
    ());

count('set', -5);
count();
count('count');
console.log( count('get') ); // -3
