

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

mine.oreRate = 0.8;
mine.ship.cargo = [];
mineMod.update(home, mine, 40);

var ship = mine.ship;
console.log('ship distance: ', ship.distance);
console.log('ship dir: ', ship.dir);
console.log('cargo: ', mine.ship.cargo);


var over = ship.over;
console.log('over dist: ' + over.distance);
console.log('over round trips: ' + over.roundTrips);

console.log('');

mine.ores.forEach(function(ore, i){
    console.log('mine ore ' + i + ': ', ore.name, ore.amount);
});
console.log('');
home.oreCollection.forEach(function(ore, i){
    console.log('home ore ' + i + ': ', ore.name, ore.amount);
});

//console.log(ship.over);
