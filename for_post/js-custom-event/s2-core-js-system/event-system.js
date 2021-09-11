(function (api) {

    //
    api.addEvent = function (obj, opt) {
        opt = opt || {};

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
