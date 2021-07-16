

var home = homeMod.create();

var mine = mineMod.create(home, {
        name: 'Furea',
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

mineMod.update(home, mine, 10);
