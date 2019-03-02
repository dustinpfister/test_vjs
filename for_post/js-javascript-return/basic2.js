var figMoney = function (score, compare, rpm, imp, ctr) {
    ctr = ctr === undefined ? 0.5 : ctr;
    imp = imp === undefined ? 6.5 : imp;
    rpm = rpm === undefined ? 1.5 : rpm;
    compare = compare === undefined ? 1 : rpm;
    score = score === undefined ? 0 : rpm;

    // lengthly expression
    return score / compare * imp * ctr * rpm;
};

console.log( figMoney() ); // 0
