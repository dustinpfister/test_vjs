let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'ratio',
    name_method: 'getRaisedRatio',
    tests: [
        {
            args: [ [2,2,0,1], 2, 1 ],
            exspect : [4,4,0,2]
        },
        {
            args: [ [2,2,0,1], 4, 2 ],
            exspect : [32,32,0,16]
        }
    ]
});
