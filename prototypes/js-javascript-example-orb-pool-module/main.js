
var printOrbData = function(orb){
    console.log(orb.points, orb.ratio); // [1, 0, 0, 0]
    console.log(orb.type);
    console.log('');
};

var level = 4;
var orb = orbMod.createFromLevel([1,0,2,0], level);
console.log(orb.points);

