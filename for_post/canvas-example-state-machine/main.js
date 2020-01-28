var sm = Machine('gamearea');

sm.load({

    name: 'game',
    bootState: true,

    init: function (sm) {
        console.log('container:');
        console.log(sm.container);
    },

    tick: function (sm) {},
    userPointer: {
        start: function (pt, sm) {

            console.log(pt.x, pt.y);

        },
        move: function (pt, sm) {},
        end: function (pt, sm) {}
    }

});

sm.start();
