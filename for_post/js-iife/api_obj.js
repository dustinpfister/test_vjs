var game = (function () {

    // private variables and methods
    var state;
    var makeNewState = function () {
        return {
            money: 0,
            manual: 1,
            auto: {
                tickRate: 1000,
                lt: new Date(),
                perTick: 1
            }
        };
    };
    var loadState = function () {
        var state = document.localStorage ? document.localStorage.state : false;
        if (state) {
            return state;
        }
        return makeNewState();
    };

    // public API as an Object literal
    return {
        init: function () {
            state = loadState;
        },
        userAction: function () {
            state.money += state.manual;
        },
        tick: function () {
            var now = new Date(),
            t = now - state.auto.lt,
            ticks = t / state.auto.tickRate;
            if (ticks >= 1) {
                state.money += state.auto.perTick * ticks;
                state.auto.lt = now;
            }
        }
    };

}
    ());
