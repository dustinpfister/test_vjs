(function (api) {

    //
    api.addEvent = function (obj, opt) {
        opt = opt || {};
        // user Event Object
        var userEvent = {};
        // need a forDispatch method
        userEvent.forDispatch = opt.forDispatch || function () {};
        // need an array of listeners
        userEvent.listeners = [];
        // attach to the objects own properties
        obj.userEvent = userEvent;
        return obj;
    };

    // attach a listener for the object that will fire
    // when the event happens
    api.addListener = function (obj, eventKey, callBack) {

        return obj;
    };

    // dispatch an event for the given object, passing the event key, and options
    api.dispatch = function (obj, eventKey, opt) {

        return obj;
    };

    // this module should work well in nodejs, or client javaScript
}
    (typeof module === 'undefined' ? this['eventMod'] = {}
        : module.exports));
