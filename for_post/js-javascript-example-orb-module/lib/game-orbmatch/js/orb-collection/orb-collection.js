(function (api) {

    // create an orbCollection object
    api.create = function (opt) {
        opt = opt || {};
        opt.count = opt.count === undefined ? 1 : opt.count;
        opt.points = opt.points || [1, 0, 0, 0];
        opt.level = opt.level === undefined ? 1 : opt.level;
        var collection = {
            faction: opt.faction || 'ai',
            key: opt.key || 'orbCollection',
            orbs: []// the main array of orb objects in this orb collection
        };
        // populate orb pool
        var orb,
        i = 0;
        while (i < opt.count) {
            orb = orbMod.createFromLevel(opt.points, opt.level);
            orb.data.i = i; // add index to user data object
            orb.data.faction = collection.faction; // add faction string
            orb.data.key = collection.key; // add faction string
            orb.data.homeX = 32 + (32 + 2) * i;
            orb.data.homeY = 400;
            //??? I MAY NOT NEED TO ADD A REF To Collection
            //orb.data.collection = collection; // ref to the collection
            orb.x = orb.data.homeX;
            orb.y = orb.data.homeY;
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
