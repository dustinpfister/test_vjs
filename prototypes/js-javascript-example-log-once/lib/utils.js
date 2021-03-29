var utils = {};

utils.log = function (mess) {
    console.log(mess);
};

utils.createLogOnce = function (callBack) {
    var count = 1;
    return function (mess) {
        if (count > 0) {
            utils.log(mess);
            count -= 1;
        }
    };
};

utils.isBrowser = function () {
    try {
        return this === window;
    } catch (e) {
        return false;
    }
};

// if nodejs, export utils
if (!utils.isBrowser()) {
    module.exports = utils;
}
