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
        mine.ship.distance = 0;
        mine.ship.dir = 1;
        // speed
        mine.ship.speed = opt.shipSpeed || 10;
        // cargo
        mine.ship.cargoMax = opt.shipCargoMax || 5;
        mine.ship.cargo = 0;

        return mine;
    };

}
    (this['mineMod'] = {}));
