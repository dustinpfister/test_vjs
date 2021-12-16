let forEach = function (obj, func) {
    let keys = Object.keys(obj), len = keys.length, i = 0;
    while (i < len) {
        if (func.call(obj, obj[keys[i]], keys[i], obj)) {
            break;
        }
        i += 1;
    }
};
