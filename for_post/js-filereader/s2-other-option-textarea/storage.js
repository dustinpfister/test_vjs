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
        var loadButton = document.createElement('input');
        loadButton.type = 'button';
        loadButton.value = 'Load';
        opt.container.appendChild(loadButton);
        return opt.container;
    };

    StorageMod.create = function (opt) {
        opt = opt || {};
        var storage = {};
        // create the UI for the given container or body
        storage.el = createUI(opt);
        storage.onNoSaveFound = opt.onNoSaveFound || function (storage) {};
        storage.onLoadState = opt.onLoadState || function (storage, state) {};
		StorageMod.load(storage);
        return storage;
    };

    // save to the storage
    StorageMod.save = function (storage, state) {
        var textArea = storage.el.querySelector('textarea');
        textArea.value = JSON.stringify(state);
    };

    // load from the storage
    StorageMod.load = function (storage) {
        var textArea = storage.el.querySelector('textarea');
        var state = null;
        // try to load what should be json
        try {
            state = JSON.parse(textArea.value);
        } catch (e) {
            // if there is an error loading json call the no save found call back
            // this method should return a new state
            state = storage.onNoSaveFound.call(storage, storage);
        }
        // save what is loaded, OR CREATED in the event of an error
        // in any case this should update things like the text area element
        StorageMod.save(storage, state);
        // call on load state callback
        storage.onLoadState(storage, state);
        return state;
    };

}
    (this['StorageMod'] = {}));
