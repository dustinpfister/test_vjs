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
        opt.ores.forEach(function (oreProps, i) {
            var oreData = home.OREDATA[oreProps.index];
            mine.ores.push({
                name: oreData.name,
                index: oreProps.index,
                yeild: oreProps.points / totalOrePoints, // the ratio of ore rate to credit to amount on each update
                loadPriority: i,
                amount: 0 // current amount of this ore
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
        mine.ship.cargo = [];
        // over object used to figure state of credits, and cargo
        // when the ship goes out of bounds as a result of a large time
        // delta from that last update.
        mine.ship.over = {
            distance: 0,
            trips: 0,
            roundTrips: 0,
            credits: 0,
            load: false
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

    // sort an array of ore objects by the loadPriorty prop
    var sortPriority = function (ore1, ore2) {
        if (ore1.loadPriority < ore2.loadPriority) {
            return 1;
        }
        if (ore1.loadPriority > ore2.loadPriority) {
            return -1;
        }
        return 0;
    };

    // credit cargo helper
    var creditCargo = function (home, mine) {
        mine.ship.cargo.forEach(function (cargo) {
            var homeOre = home.oreCollection[cargo.index];
            homeOre.amount += cargo.amount;
        });
        mine.ship.cargo = [];
    };

    // process credits in the over object
    var processOverCredits = function(home, mine){
        var i = 0,
        ship = mine.ship,
        over = ship.over,
        delta,
        freeSpace = ship.cargoMax * over.credits,
        ore,
        homeOre,
        mineOres = mine.ores.sort(sortPriority);
        while(i < mine.ores.length){
            ore = mineOres[i];
            // full?
            delta = ore.amount;
            if(delta <= ore.amount && freeSpace >= delta){
                freeSpace -= delta;
                ore.amount -= delta;
                homeOre = home.oreCollection[ore.index];
                homeOre.amount += delta;
            }
            // fill free space
            delta = freeSpace;
            if(delta <= ore.amount && freeSpace >= delta){
                freeSpace -= delta;
                ore.amount -= delta;
                homeOre = home.oreCollection[ore.index];
                homeOre.amount += delta;
            }  
            i += 1;
        }
    };

    // process cargo for the mine with given credits and load boolean values
    var processOver = function (home, mine) {
        var ship = mine.ship,
        over = ship.over;
        // if the ship has cargo add the cargo to home, and clear out the cargo
        creditCargo(home, mine);
        // add any and all credits to home
        processOverCredits(home, mine);
        // load cargo
        if(over.load){
            var i = 0,
            delta,
            freeSpace = ship.cargoMax;
            var mineOres = mine.ores.sort(sortPriority),
            ore;
            while (i < mine.ores.length) {
                ore = mineOres[i];
                // if ore amount is greater than or equal to feeSpace
                // then I can just fill the free space with the ore
                // and break out of this loop
                if (ore.amount >= freeSpace) {
                    delta = freeSpace;
                    freeSpace = 0;
                    ore.amount -= delta;
                    ship.cargo.push({
                        index: ore.index,
                        amount: delta
                    });
                    break;
                }
                // if ore amount is less than freeSpace
                // then load what there is for that ore
                // and continue
                delta = ore.amount;
                freeSpace -= ore.amount;
                ore.amount = 0;
                ship.cargo.push({
                    index: ore.index,
                    amount: delta
                });
                i += 1;
            }
        }
        // heading away from home with cargo!? credit it to home.
        if (ship.cargo.length > 0 && ship.dir === 1) {
            creditCargo(home, mine);
        }
    };

    // update the state of the ship, and also the given home object
    var updateShip = function (home, mine, secs) {
        var ship = mine.ship;
        // reset over values
        ship.over.distance = 0;
        ship.over.trips = 0;
        ship.over.roundTrips = 0;
        // update fistance
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
        //var credits = 0,
        //loadCargo = false;
        ship.over.credits = 0;
        ship.over.load = false;
        if (ship.over.roundTrips >= 0.5) {
            if (ship.over.roundTrips >= 1) {
                ship.over.credits = Math.floor(ship.over.roundTrips);
            }
            // load cargo bool?
            if (ship.over.roundTrips % 1 >= 0.5) {
                ship.over.load = true;
            }
            processOver(home, mine);
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
