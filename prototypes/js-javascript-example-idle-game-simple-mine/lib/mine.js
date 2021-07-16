(function (api) {

    api.create = function (home, opt) {
        home = home || homeMod.create();
        opt = opt || {};
        opt.name = opt.name || 'fooMine';
        opt.ores = opt.ores || [];
        var mine = {};
        mine.name = opt.name;
        mine.distance = 100;
        // set up ore objects for the mine
        mine.ores = [];
        var totalOrePoints = opt.ores.reduce(function (total, oreProps) {
                return total + oreProps.points;
            }, 0);
        opt.ores.forEach(function (oreProps) {
            var oreData = home.OREDATA[oreProps.index];
            mine.ores.push({
                name: oreData.name,
                yeild: oreProps.points / totalOrePoints,
                amount: 0
            });
        });
        // create ship object for the mine
        mine.ship = {};
        // start at home heading out
        mine.ship.distance = 80;
        mine.ship.dir = -1;
        // speed
        mine.ship.speed = opt.shipSpeed || 10;
        // cargo
        mine.ship.cargoMax = opt.shipCargoMax || 5;
        mine.ship.cargo = 0;
        return mine;
    };

    // update a mine object by a secs time delta
    api.update = function (home, mine, secs) {

        var ship = mine.ship,
        overDist = 0,
        trips = 0,
        roundTrips = 0;

        ship.distance += ship.speed * ship.dir * secs;
        // when past home out in space?
        if (ship.distance < 0) {
            ship.distance = Math.abs(ship.distance);
            ship.dir = 1;
        }
        // reached the mine?
        if (ship.distance >= mine.distance) {
            overDist = ship.distance - mine.distance;
            trips = 1 + overDist / mine.distance;
            roundTrips = trips / 2;

            // update dir, and correct ship.distance
            ship.dir = 1 - 2 * Math.floor(trips % 2);
            ship.distance = mine.distance - mine.distance * (trips % 1);
        }

        console.log('ship distance: ', ship.distance);
        console.log('ship dir', ship.dir);
        console.log('over dist: ', overDist);
        console.log('trips: ', trips);
        console.log('round trips: ', roundTrips);

    };

}
    (this['mineMod'] = {}));
