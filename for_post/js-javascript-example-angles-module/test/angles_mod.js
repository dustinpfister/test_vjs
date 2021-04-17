let path = require('path'),
testMod = require(path.resolve(__dirname, './testmod.js'));

testMod.runTest({
    name_mod: 'angles',
    name_method: 'mod',
    dir_lib: path.resolve(__dirname, '../lib'),
    testFunction: function (result, exspect) {
        return result === exspect;
    },
    tests: [{
            args: [-3, 10],
            exspect: 7
        }, {
            args: [12, 10],
            exspect: 2
        },
    ]
});
