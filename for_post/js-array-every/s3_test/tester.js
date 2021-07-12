let testAll = (array, tester, every) => {
    let pass = false,
    i = 0,
    len = array.length;
    every = every === undefined ? true : every;
    while (i < len) {
        var el = array[i];
        var result = tester(el, i, array);
        // if every
        if (every) {
            pass = true;
            if (!result) {
                pass = false;
                break;
            }
        }
        // if not every (some)
        if (!every) {
            pass = false; // default pass to false
            if (result) {
                pass = true;
                break;
            }
        }
        i += 1;
    }
    return pass;
};

let isNum = (el, i, array) => {
    return typeof el === 'number';
};

let arr1 = [1, 2, 'c'];
console.log(testAll(arr1, isNum, true)); // false
console.log(testAll(arr1, isNum, false)); // true

let arr2 = [1, 2, 3];
console.log(testAll(arr2, isNum, true)); // true
console.log(testAll(arr2, isNum, false)); // true
