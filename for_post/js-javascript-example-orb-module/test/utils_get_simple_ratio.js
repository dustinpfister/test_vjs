let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'utils',
    name_method: 'getSimpleRatio',
    tests: [
        {
            args: [ [1,0,0,0] ],
            exspect : [1,0,0,0]
        },
        {
            args: [ [0,3,3,3] ],
            exspect : [0,1,1,1]
        },
        {
            args: [ [7,7,7,7] ],
            exspect : [1,1,1,1]
        },
        {
            args: [ [2,2,5,0] ],
            exspect : [2,2,5,0]
        },
        {
            args: [ [14,0,7,0] ],
            exspect : [2,0,1,0]
        }
    ]
});
