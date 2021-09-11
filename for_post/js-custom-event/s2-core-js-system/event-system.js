(function (api) {

    //
    api.addEvent = function (obj, opt) {
        opt = opt || {};
        // user Event Object
        var userEvent = {};
        // MUST GIVE AN EVENT KEY
        userEvent.eventKey = opt.eventKey;
        // need a forDispatch method
        userEvent.forDispatch = opt.forDispatch || function () {};
        // need an array of listeners
        userEvent.listeners = [];
        // attach to the objects own properties
        obj.ue = obj.ue || {};
        obj.ue[userEvent.eventKey] = userEvent;
        return obj;
    };

    // attach a listener for the object that will fire
    // when the event happens
    api.addListener = function (obj, eventKey, callBack) {
        // get listeners for the eventKey
        var listeners = obj.ue[eventKey].listeners;
        // if we have listeners push the callback
        if (listeners) {
            listeners.push(callBack);
        }
        return obj;
    };

    // dispatch an event for the given object, passing the event key, and options
    api.dispatch = function (obj, eventKey, dispatchOpt) {
        var eventObj = obj.ue[eventKey];
        eventObj.listeners.forEach(function (cb) {
            // call the listener
            cb.call(eventObj, eventObj.forDispatch.call(eventObj, obj, dispatchOpt));
        });
        return obj;
    };

    // this module should work well in nodejs, or client javaScript
}
    (typeof module === 'undefined' ? this['eventMod'] = {}
        : module.exports));
