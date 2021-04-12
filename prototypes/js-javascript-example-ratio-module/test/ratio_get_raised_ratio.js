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
            exspect : [16,16,0,4]
        },
        {
            args: [ [7,0,14,1], 8, 1 ],
            exspect : [56,0,112,8]
        }
    ]
});
