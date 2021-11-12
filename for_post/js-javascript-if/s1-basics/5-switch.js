var func = function (n) {
    switch (n) {
        case 40:
            return 'good';
            break;
        case 42:
            return 'great';
            break;
        default:
            return 'bad';
            break;
    }
};
console.log( func(40) ); // good
console.log( func(42) ); // great
console.log( func() );   // bad
