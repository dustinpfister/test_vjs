var game = (function () {

    // create and return a new game save state
    var createNewState = function () {
        return {
            money: 0,
            gatherRate: {
                maunal: 1,
                auto: 0
            }
        };
    };

    return {

        // return the state object to use
        init: function () {
            return createNewState();
        },

        // a manual gather action has happened to the given state
        manualGather: function (state) {
            state.money += state.gatherRate.manual;
        },

        // I would like to update the given state
        update: function (state) {}

    };

}
    ());
