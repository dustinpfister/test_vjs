

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
//console.log(JSON.stringify(mine));

mine.ship.dir = 1;
mine.ship.distance = 0;
mineMod.update(home, mine, 1);
