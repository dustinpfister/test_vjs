(function (StorageMod) {

    StorageMod.createUI = function (opt) {
        opt = opt || {};
        opt.container = opt.container || document.body;
        if (typeof opt.container === 'string') {
            opt.container = document.querySelector(opt.container);
        }
        console.log(opt);
    }

}
    (this['StorageMod'] = {}));
