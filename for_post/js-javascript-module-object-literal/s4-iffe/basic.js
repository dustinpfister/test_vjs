var utils = {};

utils.logOnce = (function () {
    var count = 0;
    return function (mess, maxCount, resetCount) {
        maxCount = maxCount === undefined ? 1 : maxCount;
        resetCount = resetCount === undefined ? false : resetCount;
        if (resetCount) {
            count = 0;
        }
        if (count < maxCount) {
            console.log(mess);
            count += 1;
        }
    };
}
    ());

var i = 0;
while (i < 15) {
    utils.logOnce('hello ' + i, 1, i >= 9 && i <= 11);
    i += 1;
}
/*
hello 0
hello 9
hello 10
hello 11
*/
