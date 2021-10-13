(function (StorageMod) {

    // create the UI
    var createUI = function (opt) {
        opt = opt || {};
        opt.container = opt.container || document.body;
        if (typeof opt.container === 'string') {
            opt.container = document.querySelector(opt.container);
        }
        var textArea = document.createElement('textarea');
        textArea.cols = opt.cols || 60;
        textArea.rows = opt.rows || 15;
        opt.container.appendChild(textArea);
        return opt.container;
    };

    StorageMod.create = function (opt) {
        opt = opt || {};
        var storage = {};
        // create the UI for the given container or body
        storage.el = createUI(opt);
        return storage;
    };

    // save to the storage
    StorageMod.save = function (storage, state) {
        var textArea = storage.el.querySelector('textarea');
        textArea.value = JSON.stringify(state);
    };

    // load from the storage
    StorageMod.load = function (storage) {};

}
    (this['StorageMod'] = {}));
