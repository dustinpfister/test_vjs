let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'ratio',
    name_method: 'countNonZero',
    testFunction :  function(result, exspect, testObj, opt) {
       return result === exspect;
    },
    tests: [
        {
            args: [ [1,0,0,0] ],
            exspect : 1
        },
        {
            args: [ [1,1,0,0] ],
            exspect : 2
        },
        {
            args: [ [1,1,1,0] ],
            exspect : 3
        },
        {
            args: [ [1,1,1,1] ],
            exspect : 4
        },
        {
            args: [ [1,2,0,4] ],
            exspect : 3
        },
        {
            args: [ [7,0,0,14] ],
            exspect : 2
        },
        {
            args: [ [0,1,1,0] ],
            exspect : 2
        }
    ]
});
