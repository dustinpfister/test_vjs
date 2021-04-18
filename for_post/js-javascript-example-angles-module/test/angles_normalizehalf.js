let path = require('path'),
testMod = require(path.resolve(__dirname, './testmod.js'));

testMod.runTest({
    name_mod: 'angles',
    name_method: 'normalizeHalf',
    dir_lib: path.resolve(__dirname, '../lib'),
    testFunction: function (result, exspect) {
        return result === exspect;
    },
    tests: [{
            args: [12],
            exspect: -0.5663706143591725
        }, {
            args: [-390, 360],
            exspect: -30
        },
    ]
});
