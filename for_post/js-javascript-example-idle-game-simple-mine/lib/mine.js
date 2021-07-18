(function (api) {

    api.create = function (home, opt) {
        home = home || homeMod.create();
        opt = opt || {};
        opt.name = opt.name || 'fooMine';
        opt.ores = opt.ores || [];
        var mine = {};
        mine.name = opt.name;
        mine.distance = opt.distance || 100;
        mine.oreRate = opt.oreRate || 10;
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
        mine.ship.distance = 0;
        mine.ship.dir = 1;
        // speed
        mine.ship.speed = opt.shipSpeed || 10;
        // cargo
        mine.ship.cargoMax = opt.shipCargoMax || 5;
        mine.ship.cargo = 0;
        // over object used to figure state of credits, and cargo
        // when the ship goes out of bounds as a result of a large time
        // delta from that last update.
        mine.ship.over = {
            distance: 0,
            trips: 0,
            roundTrips: 0
        };

        return mine;
    };

    // ship distance correction
    var shipDistanceCorrection = function (ship, trips) {
        if (ship.dir === -1) {
            ship.distance = mine.distance - mine.distance * (trips % 1);
        } else {
            ship.distance = mine.distance * (trips % 1);
        }
    };

    // process cargo for the mine with given credits and load boolean values
    var processCargo = function (home, mine, credits, loadCargo) {

        // if the ship has cargo add that to home

        // add any and all credits to home

        // load cargo

        //console.log('credits: ', credits);
        //console.log('load cargo: ', loadCargo);
    };

    // update the state of the ship, and also the given home object
    var updateShip = function (home, mine, secs) {
        var ship = mine.ship;
        ship.over.distance = 0;
        ship.over.trips = 0;
        ship.over.roundTrips = 0;
        ship.distance += ship.speed * ship.dir * secs;
        // when past home out in space?
        if (ship.distance <= 0) {
            ship.over.diststance = Math.abs(ship.distance);
            ship.over.trips = 1 + ship.over.distance / mine.distance;
            ship.over.roundTrips = ship.over.trips / 2;
            // update dir, and correct ship.distance
            ship.dir = -1 + 2 * Math.floor(ship.over.trips % 2);
            shipDistanceCorrection(ship, ship.over.trips);
        }
        // reached the mine?
        if (ship.distance >= mine.distance) {
            ship.over.distance = ship.distance - mine.distance;
            ship.over.trips = 1 + ship.over.distance / mine.distance;
            ship.over.roundTrips = ship.over.trips / 2;
            // update dir, and correct ship.distance
            ship.dir = 1 - 2 * Math.floor(ship.over.trips % 2);
            shipDistanceCorrection(ship, ship.over.trips);
        }
        // credit / load cargo values
        var credits = 0,
        loadCargo = false;
        if (ship.over.roundTrips >= 0.5) {
            if (ship.over.roundTrips >= 1) {
                credits = Math.floor(ship.over.roundTrips);
            }
            // load cargo bool?
            if (ship.over.roundTrips % 1 >= 0.5) {
                loadCargo = true;
            }
            processCargo(home, mine, credits, loadCargo);
        }
    };

    // update the ore prop of the mine object
    var updateOres = function (home, mine, secs) {
        // update amounts ready for pick up by the ship
        mine.ores.forEach(function (ore) {
            var amountDelta = ore.yeild * mine.oreRate * secs;
            ore.amount += amountDelta;
        });
    };

    // update a mine object by a secs time delta
    api.update = function (home, mine, secs) {
        // update ores
        updateOres(home, mine, secs);
        // update the ship, as well as the state of the home object
        updateShip(home, mine, secs);
    };

}
    (this['mineMod'] = {}));
