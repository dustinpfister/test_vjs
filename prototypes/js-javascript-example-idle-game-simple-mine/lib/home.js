(function (api) {

    var ORE_DATA_DEFAULT = [
        // ore 0 - copper
        {
            name: 'copper',
            baseValue: 1
        }
    ];

    var newOreCollection = function (home) {
        var oreCollection = [];
        home.OREDATA.forEach(function (oreProps) {
            oreCollection.push({
                name: oreProps.name,
                amount: 0
            });
        });
        return oreCollection;
    };

    api.create = function (opt) {
        opt = opt || {};
        var home = {};
        home.OREDATA = opt.OREDATA || ORE_DATA_DEFAULT;
        home.oreCollection = opt.oreCollection || newOreCollection(home);
        return home;

    };

}
    (this['homeMod'] = {}));
