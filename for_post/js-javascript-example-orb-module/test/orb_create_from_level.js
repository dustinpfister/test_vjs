let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') );

testMod.runTest({
    name_mod: 'orb_node',
    name_method: 'createFromLevel',
    testFunction : function(result, exspect, testObj, opt) {
        return exspect(result);
    },
    tests: [
        {
            args: [[1,0,2,0], 1],
            exspect : function(orb){
                return orb.points.join('') === '1020' && orb.ratio.join('') === '1020';
            }
        },
        {
            args: [[1,0,2,0], 2],
            exspect : function(orb){
                return orb.points.join('') === '2040' && orb.ratio.join('') === '1020';
            }
        },
        {
            args: [[1,0,2,0], 3],
            exspect : function(orb){
                return orb.points.join('') === '4080' && orb.ratio.join('') === '1020';
            }
        },
        {
            args: [[1,0,2,0], 4],
            exspect : function(orb){
                return orb.points.join('') === '80160' && orb.ratio.join('') === '1020';
            }
        }
    ]
});
