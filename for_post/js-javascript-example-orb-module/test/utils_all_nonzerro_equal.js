let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'utils',
    name_method: 'allNonZeroEqual',
    tests: [
        {
            args: [ [1,0,1,1] ],
            exspect : true
        },
        {
            args: [ [1,2,0,4] ],
            exspect : false
        }
    ]
});
