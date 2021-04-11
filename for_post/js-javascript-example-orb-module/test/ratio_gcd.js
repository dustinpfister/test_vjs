let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'ratio',
    name_method: 'GCD',
    testFunction : function(result, exspect, testObj, opt) {
        return exspect === result;
    },
    //log: function(mess, type, pass){
    //    console.log(mess);
    //},
    tests: [
        {
            args: [5, 10],
            exspect : 5
        },
        {
            args: [10, 5],
            exspect : 5
        },
        {  
            args: [1, 7],
            exspect : 1
        }
    ]
});
