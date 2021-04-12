let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'utils',
    name_method: 'distance',
    testFunction: function(result, exspect){
        // round becuase something like 99.99... is just about 100
        return Math.round(result) === exspect;
    },
    tests: [
        {
            args: [0,0, Math.cos(Math.PI * 0.25) * 100, Math.sin(Math.PI * 0.25) * 100],
            exspect : 100
        },
        {
            args: [0,0,100,0],
            exspect : 100
        },
    ]
});
