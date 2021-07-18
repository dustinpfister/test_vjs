

var home = homeMod.create();

var mine = mineMod.create(home, {
        name: 'Furea',
        distance: 100,
        ores: [{
                index: 0,
                points: 3
            }, {
                index: 1,
                points: 1
            }
        ]
    });
mine.ship.dir = 1;
mine.ship.distance = 0;

mine.oreRate = 1.25;
mine.ship.cargo = [
//    {index: 0, amount: 3},
//    {index: 1, amount: 2}
];
mineMod.update(home, mine, 12);

var ship = mine.ship;
console.log('ship distance: ', ship.distance);
console.log('ship dir: ', ship.dir);
console.log('cargo: ', mine.ship.cargo);

home.oreCollection.forEach(function(ore, i){
    console.log('home ore ' + i + ': ', ore.name, ore.amount);
});

var over = ship.over;
console.log('over dist: ' + over.distance);

//console.log(ship.over);
