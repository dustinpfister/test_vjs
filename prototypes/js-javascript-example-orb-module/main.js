
var printOrbData = function(orb){
    console.log(orb.points, orb.ratio); // [1, 0, 0, 0]
    console.log(orb.type);
    console.log('');
};

// pure ( [1,0,0,0], [0,1,0,0] )
printOrbData( orbMod.create({points:[1,0,0,0]}) );
printOrbData( orbMod.create({points:[0,7,0,0]}) );
printOrbData( orbMod.create({points:[0,0,8,0]}) );
printOrbData( orbMod.create({points:[0,0,0,3]}) );

// dule ( [1,0,0,1], [0,1,1,0])
printOrbData( orbMod.create({points:[0,7,0,7]}) );
printOrbData( orbMod.create({points:[7,0,0,7]}) );
printOrbData( orbMod.create({points:[0,7,7,0]}) );
printOrbData( orbMod.create({points:[7,0,7,0]}) );

// triple ( [1,1,1,0], [1,0,1,1] )
printOrbData( orbMod.create({points:[3,3,0,3]}) );
printOrbData( orbMod.create({points:[3,3,3,0]}) );

// quad ( [1,1,1,1] )
printOrbData( orbMod.create({points:[8,8,8,8]}) );

// composite ( [1,1,0,2], [4,0,1,4] )
printOrbData( orbMod.create({points:[2,2,0,4]}) );
printOrbData( orbMod.create({points:[0,2,1,3]}) );
printOrbData( orbMod.create({points:[8,0,2,8]}) );

// from orbs test
var a = orbMod.create({points:[1,0,0,0]}),
b = orbMod.create({points:[1,0,2,0]});
var orb = orbMod.fromOrbs([a, b]);
printOrbData(orb);

