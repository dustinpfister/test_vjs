
var printOrbData = function(orb){
    console.log(orb.points, orb.ratio); // [1, 0, 0, 0]
    console.log(orb.type);
    console.log('');
};

// pure
printOrbData( orbMod.create({points:[1,0,0,0]}) );
printOrbData( orbMod.create({points:[0,7,0,0]}) );
printOrbData( orbMod.create({points:[0,0,8,0]}) );
printOrbData( orbMod.create({points:[0,0,0,3]}) );


// dule
printOrbData( orbMod.create({points:[0,7,0,7]}) );
printOrbData( orbMod.create({points:[7,0,0,7]}) );
printOrbData( orbMod.create({points:[0,7,7,0]}) );
printOrbData( orbMod.create({points:[7,0,7,0]}) );


// triple
printOrbData( orbMod.create({points:[3,3,0,3]}) );
printOrbData( orbMod.create({points:[3,3,3,0]}) );

// quad
printOrbData( orbMod.create({points:[8,8,8,8]}) );





//var d = orbMod.fromOrbs([a, b]);
