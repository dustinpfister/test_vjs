
let tester = (array, tester) => {

    let pass = true,
    i = 0;
    while (i < len) {
        var el = array[i];
        var result = tester(el, i, array);
        if (!result) {
            pass = false;
            break;
        }
        i += 1;
    }
    return pass;
};
