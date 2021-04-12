let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') ),
orbs = require(path.resolve(__dirname, '../lib/orb_node.js'));

console.log(orbs)

/*
testMod.runTest({
    name_mod: 'orb_node',
    name_method: 'createFromOrbs',
    testFunction : function(result, exspect, testObj, opt) {
        return exspect(result);
    },
    tests: [
        {
            args: [[1,0,0,0]],
            exspect : function(orb){
                return orb.level === 1;
            }
        },
        {
            args: [[0,8,8,0]],
            exspect : function(orb){
                return orb.level === 4;
            }
        },
        {
            args: [[6,0,6,2]],
            exspect : function(orb){
                return orb.level === 2;
            }
        }
    ]
});
*/