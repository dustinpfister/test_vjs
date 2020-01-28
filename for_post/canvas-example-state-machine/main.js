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
        start: function (pt, sm, e) {

            console.log(e.type, pt.x, pt.y);

        },
        move: function (pt, sm, e) {

            console.log(e.type, pt.x, pt.y);

        },
        end: function (pt, sm, e) {

            console.log(e.type, pt.x, pt.y);

        }
    }

});

sm.start();
