let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'utils',
    name_method: 'getSimpleRatio',
    tests: [
        {
            args: [ [5, 10] ],
            exspect : [1, 2]
        }
    ]
});
