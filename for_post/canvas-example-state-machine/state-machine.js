var stateMachine = (function () {

    // create a new state machine
    return function () {

        var currentState = null;

        var sm = {
            game: {},
            states: {},
            load: function (stateObj) {
                // just reference the object for now as long as
                // that works okay
                states[stateObj.name || 'game'] = stateObj;
                if (stateObj.bootState) {
                    currentState = stateObj.name;
                }
            },
            start: function () {
                loop();
            }
        };

        // states
        var states = sm.states = {};

        var game = sm.game = {};

        // main loop
        var loop = function () {
            requestAnimationFrame(loop);
            var stateObj = states[currentState] || {};
            if (stateObj.every) {
                var every = stateObj.every;
                if (every.tick) {
                    every.tick(game, sm);
                }
            }
        };

        return sm;

    };

}
    ());
