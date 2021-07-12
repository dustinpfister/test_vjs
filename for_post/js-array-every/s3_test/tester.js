let testAll = (array, tester, every) => {
    let pass = false,
    i = 0;
    every = every === undefined ? true : every;
    while (i < len) {
        var el = array[i];
        var result = tester(el, i, array);
        // every
        if (!result && every) {
            pass = false;
            break;
        }
        // not every (some)
        if (result && !every) {
            pass = true;
            break;
        }
        i += 1;
    }
    return pass;
};
