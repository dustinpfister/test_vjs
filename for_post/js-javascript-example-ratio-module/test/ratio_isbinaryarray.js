let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'ratio',
    name_method: 'isBinaryArray',
    testFunction :  function(result, exspect, testObj, opt) {
       return result === exspect;
    },
    tests: [
        {
            args: [ [1,0,0,0] ],
            exspect : true
        },
        {
            args: [ [1,1,0,0] ],
            exspect : true
        },
        {
            args: [ [0,1,1,1] ],
            exspect : true
        },
        {
            args: [ [0,1,1,0] ],
            exspect : true
        },
        {
            args: [ [1,1,1,0] ],
            exspect : true
        },
        {
            args: [ [1,1,1,1] ],
            exspect : true
        },
        {
            args: [ [1,2,0,4] ],
            exspect : false
        },
        {
            args: [ [7,0,0,14] ],
            exspect : false
        },
        {
            args: [ [1,1,2,1] ],
            exspect : false
        },
        {
            args: [ [] ],
            exspect : false
        },
        {
            args: [ [{},null, {}] ],
            exspect : false
        },
        {
            args: [ [null, null] ],
            exspect : false
        },
        {
            args: [ [true, false] ],
            exspect : false
        }
    ]
});
