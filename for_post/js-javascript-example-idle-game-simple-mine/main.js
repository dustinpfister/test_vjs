

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
mineMod.update(home, mine, 23);

var ship = mine.ship;
console.log('ship distance: ', ship.distance);
console.log('ship dir', ship.dir);
console.log('cargo: ', mine.ship.cargo);

var over = ship.over;
console.log('over dist: ' + over.distance);

//console.log(ship.over);
