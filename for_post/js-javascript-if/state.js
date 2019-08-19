var state = {
    current: 'init',
    i: 0,
    // init state
    init: function () {
        console.log('this is the init state.');
        state.i = 0;
        // changing the current value will cause
        // the tick method to call another state function
        state.current = 'count';
    },
    // count state
    count: function () {
        state.i += 1;
        console.log('this is count state. i=' + state.i);
        if (state.i >= 3) {
            state.current = 'end';
        }
    },
    // end state
    end: function () {
        console.log('this is the end state');
        console.log('i=' + state.i);
    },
    // calls the current state
    tick: function () {
        state[state.current]();
    }
};

state.tick();
state.tick();
state.tick();
state.tick();
state.tick();
/*
this is the init state.
this is count state. i=1
this is count state. i=2
this is count state. i=3
this is the end state
i=3
*/