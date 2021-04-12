let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'utils',
    name_method: 'boundingBox',
    testFunction: function(result, exspect){
        return result === exspect;
    },
    tests: [
        {
            args: [5,5,32,32,7,6,1,1],
            exspect : true
        },
        {
            args: [5,5,32,32,0,0,1,1],
            exspect : false
        },
    ]
});
