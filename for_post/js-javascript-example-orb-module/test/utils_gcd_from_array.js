let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'utils',
    name_method: 'GCDFromArray',
    tests: [
        {
            args: [ [5, 10] ],
            exspect : 5
        },
        {
            args: [ [7, 3, 5, 5] ],
            exspect : 1
        },
        {
            args: [ [8, 2, 16, 2] ],
            exspect : 2
        },
        {
            args: [ [0, 2, 0, 2] ],
            exspect : 2
        },
        {
            args: [ [15, 420, 5, 80] ],
            exspect : 5
        }
    ]
});
