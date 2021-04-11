let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'orb_node',
    name_method: 'createFromPoints',
    testFunction : function(result, exspect, testObj, opt) {
        return exspect(result);
    },
    tests: [
        {
            args: [[1,0,0,0]],
            exspect : function(orb){
                return orb.points.join('') === '1000' && orb.ratio.join('') === '1000';
            }
        },
        {
            args: [[0,2,2,8]],
            exspect : function(orb){
                return orb.points.join('') === '0228' && orb.ratio.join('') === '0114';
            }
        },
        {
            args: [[0,7,14,1]],
            exspect : function(orb){
                return orb.points.join('') === '07141' && orb.ratio.join('') === '07141';
            }
        }
    ]
});
