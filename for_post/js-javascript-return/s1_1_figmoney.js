var figMoney = function (score, compare, rpm, imp, ctr) {
    ctr = ctr === undefined ? 0.5 : ctr;
    imp = imp === undefined ? 6.5 : imp;
    rpm = rpm === undefined ? 1.5 : rpm;
    compare = compare === undefined ? 1 : compare;
    score = score === undefined ? 0 : score;

    // lengthly expression
    return '$' + (score / compare * imp * ctr * rpm).toFixed(2);
};

console.log( figMoney() ); // '$0.00'
console.log( figMoney(77, 5, 2) ); // '$100.10'
console.log( figMoney(7, 5, 1.4,6.5,0.12) ); // '$1.53'
