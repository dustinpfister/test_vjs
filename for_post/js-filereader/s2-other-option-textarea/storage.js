(function (StorageMod) {

    StorageMod.createUI = function (opt) {
        opt = opt || {};
        opt.container = opt.container || document.body;
        if (typeof opt.container === 'string') {
            opt.container = document.querySelector(opt.container);
        }
        var textArea = document.createElement('textarea');
        textArea.cols = opt.cols || 60;
        textArea.rows = opt.rows || 15;
        opt.container.appendChild(textArea);
    }

}
    (this['StorageMod'] = {}));
