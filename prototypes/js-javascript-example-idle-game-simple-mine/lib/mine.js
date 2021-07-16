(function (api) {

    api.create = function (home, opt) {
        home = home || homeMod.create();
        opt = opt || {
            name: 'fooMine',
            ores: [{
                    index: 0,
                    points: 3
                }, {
                    index: 1,
                    points: 1
                },
            ]
        };

        var mine = {};

        mine.distance = 100;
        mine.ores = [];

        var totalOrePoints = opt.ores.reduce(function (total, oreProps) {
                return total + oreProps.points;
            }, 0);

        opt.ores.forEach(function (oreProps) {
            var oreData = home.OREDATA[oreProps.index];
            console.log(oreData);
            mine.ores.push({
                name: oreData.name,
                amount: 0
            })
        });

        return mine;

    };

}
    (this['mineMod'] = {}));
