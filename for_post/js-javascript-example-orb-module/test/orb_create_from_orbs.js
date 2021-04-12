let path = require('path'),
testMod = require( path.resolve(__dirname, './testmod.js') ),
orb = require(path.resolve(__dirname, '../lib/orb_node.js'));


testMod.runTest({
    name_mod: 'orb_node',
    name_method: 'createFromOrbs',
    testFunction : function(result, exspect, testObj, opt) {
        return exspect(result);
    },
    tests: [
        {
            args: (function(){
                var a = orb.createFromPoints([1,0,0,0]),
                b = orb.createFromPoints([1,0,0,0]);
                return [[a, b]];
            }()),
            exspect : function(orb){
                return orb.points.join('') === '2000' && orb.type === 'pure';
            }
        },
        {
            args: (function(){
                var a = orb.createFromPoints([1,0,0,0]),
                b = orb.createFromPoints([1,0,2,0]);
                return [[a, b]];
            }()),
            exspect : function(orb){
                return orb.points.join('') === '2020' && orb.type === 'dual';
            }
        },
        {
            args: (function(){
                var a = orb.createFromPoints([7,0,7,0]),
                b = orb.createFromPoints([0,7,0,7]);
                return [[a, b]];
            }()),
            exspect : function(orb){
                return orb.points.join('') === '7777' && orb.type === 'quad';
            }
        },
        {
            args: (function(){
                var a = orb.createFromPoints([1,0,1,0]),
                b = orb.createFromPoints([1,0,2,2]);
                return [[a, b]];
            }()),
            exspect : function(orb){
                return orb.points.join('') === '2032' && orb.type === 'composite';
            }
        }
    ]
});
