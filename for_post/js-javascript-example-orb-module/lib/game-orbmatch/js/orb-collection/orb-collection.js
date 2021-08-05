(function (api) {
    api.create = function (opt) {
        opt = opt || {};
        var orb = orbMod.createFromLevel([1, 0, 2, 0], 3);
        orb.x = 64;
        orb.y = 128;
        orb.radius = 16;
        var collection = {
            orbs: [orb]// the main array of orb objects in this orb collection
        };
        return collection;
    };

    // get an orb at the given location or return null of no orb is there
    api.getOrbAtPos = function (orbCollection, x, y) {
        // loop orbs
        var i = orbCollection.orbs.length;
        while (i--) {
            var orb = orbCollection.orbs[i];
            var d = utils.distance(orb.x, orb.y, x, y);
            if (d <= orb.radius) {
                return orb;
            }
        }
        return null;
    };
}
    (this['OrbCollection'] = {}));
