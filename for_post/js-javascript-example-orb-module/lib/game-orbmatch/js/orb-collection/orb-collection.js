(function (api) {

    // create an orbCollection object
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count === undefined ? 1 : opt.count;
        var collection = {
            orbs: [] // the main array of orb objects in this orb collection
        };
        // populate orb pool
        var orb,
        i = 0;
        while (i < opt.count) {
            orb = orbMod.createFromLevel([0, 0, 0, 0], 0);
			console.log(orb)
            orb.x = 32 + (32 + 2) * i;
            orb.y = 400;
            orb.radius = 16;
            collection.orbs.push(orb);
            i += 1;
        }

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
