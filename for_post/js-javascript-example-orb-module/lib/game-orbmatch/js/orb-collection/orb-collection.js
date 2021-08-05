(function (api) {
    api.create = function (opt) {
        opt = opt || {};
        var orb = orbMod.createFromLevel([1, 0, 2, 0], 3);
        orb.x = 64;
        orb.y = 128;
        orb.radius = 16;
        var collection = {
            orbs: [orb] // the main array of orb objects in this orb collection
        };
        return collection;
    };
}
    (this['OrbCollection'] = {}));
