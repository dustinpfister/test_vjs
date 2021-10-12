var ws = {};
// get an item with local storage
ws.get = function (key, opt) {
    opt = opt || {};
    opt.onDisabled = opt.onDisabled || function () {};
    // feature test for local storage
    if (localStorage) {
        var mess = localStorage.getItem(key);
        if (mess) {
            return mess;
        } else {
            return '';
        }
    } else {
        opt.onDisabled.call(opt, opt, key);
    }
};
// set an item with local storage
ws.set = function (key, value) {
    opt = opt || {};
    opt.onDisabled = opt.onDisabled || function () {};
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        opt.onDisabled.call(opt, opt, key);
    }
};
