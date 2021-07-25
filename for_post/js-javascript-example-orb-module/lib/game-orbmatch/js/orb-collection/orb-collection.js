(function (api) {
    api.create = function (opt) {
        opt = opt || {};
        var collection = {
            orbs: [orbMod.createFromLevel([1, 0, 2, 0], 3)] // the main array of orb objects in this orb collection
        };
        return collection;
    };
}
    (this['OrbCollection'] = {}));
