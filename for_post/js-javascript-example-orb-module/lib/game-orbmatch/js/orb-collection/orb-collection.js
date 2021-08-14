(function (api) {

    // create and return a clean stat delta object
    var createStatDeltaObject = function (forWhat) {
        return {
            forWhat: forWhat,
            attack: {
                current: 0
            },
            hp: {
                max: 0,
                heal: 0
            }
        };
    };

    // create and return stat deltas based on type
    var forType = {
        null: function (orb) {},
        pure: function (orb) {},
        dual: function (orb) {},
        triple: function (orb) {},
        quad: function (orb) {},
        composite: function (orb) {},
        recipe: function (orb) {}
    };

    // create and return stat deltas that are based on level, and ratio
    // [fire, earth, water, air]
    var forRatio = function (orb) {
        var deltas = createStatDeltaObject('ratio');
        // element 0 - fire - adds bonus to attack
        deltas.attack.current = orb.ratio[0] * orb.level * 1.5;
        // element 2 - water - adds bonus to hp object
        deltas.hp.max = orb.ratio[2] * orb.level * 1.5;
        deltas.hp.heal = orb.ratio[2] * orb.level * 0.125;

        return deltas;
    };

    // create and return deltas for level
    var forLevel = function (orb) {
        var deltas = createStatDeltaObject('level');
        deltas.attack.current = orb.level * 0.25;
        deltas.hp.max = 5 * orb.level;
        return deltas;
    };

    // create stat objects based on type, level, and ratio
    var createStatObjects = function (orb) {
        orb.data.hp = {
            current: 10,
            max: 10,
            per: 1,
            heal: 1
        };
        orb.data.attack = {
            current: 1
        };
        // apply deltas
        var deltas = orb.data.deltas = [];
        deltas.push(forLevel(orb));
        deltas.push(forRatio(orb));
        deltas.forEach(function (deltaObj) {
            orb.data.attack.current += deltaObj.attack.current;
            orb.data.hp.max += deltaObj.hp.max;
            orb.data.hp.heal += deltaObj.hp.heal;
        });
        orb.data.hp.per = orb.data.hp.current / orb.data.hp.max;
    };

    var createFillStyle = function (orb) {
        var m = Math.max.apply(null, orb.ratio),
        i = 5 + (orb.ratio[3] + 1) / (m + 1) * 10,
        r = 20 * (orb.ratio[0] / m) * i,
        g = 20 * (orb.ratio[1] / m) * i,
        b = 20 * (orb.ratio[2] / m) * i,
        a = orb.type === 'null' ? 0 : 1;
        if (orb.type === 'null') {
            return 'rgba(0,0,0,0)';
        }
        return 'rgba(' + r + ',' + g + ',' + b + ', ' + a + ')';
    };

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
        i = 0,
        points;
        while (i < opt.count) {
            // parse points option
            if (typeof opt.points[0] === 'number') {
                points = opt.points;
            } else {
                points = opt.points[i];
                points = points === undefined ? [1, 0, 0, 0] : points;
            }
            //orb = orbMod.createFromLevel(points, opt.level);
            orb = orbMod.createFromPoints(points);
            orb.data.i = i; // add index to user data object
            orb.data.faction = collection.faction; // add faction string
            orb.data.collectionkey = collection.key; // collectionKey
            orb.data.homeX = 32 + (32 + 2) * i;
            orb.data.homeY = 400;
            orb.data.attackMode = true;
            orb.data.deltas = [];
            orb.data.fillStyle = createFillStyle(orb);
            // create stat objects
            createStatObjects(orb);
            //??? I MAY NOT NEED TO ADD A REF To Collection
            //orb.data.collection = collection; // ref to the collection
            orb.x = orb.data.homeX;
            orb.y = orb.data.homeY;
            orb.radius = 16;
            collection.orbs.push(orb);
            i += 1;
        }
        console.log(collection.orbs[6]);
        return collection;
    };

    // set the proprieties of orb in the collection of the given index to the properties of the given orb
    api.setOrbPropsToOrb = function (orbCollection, i, orbB) {
        var orbA = orbCollection.orbs[i];
        orbA.points = orbB.points;
        orbA.ratio = orbB.ratio;
        orbA.type = orbB.type;
        orbA.level = orbB.level;
        createStatObjects(orbA);
        orbA.data.fillStyle = createFillStyle(orbA);
        // start off with full hp
        orbA.data.hp.current = orbA.data.hp.max;
        orbA.data.hp.per = 1;
        return orbA;
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

    // is the given orb, over an orb of the given collection?
    // if so return a reference to that orb from the given collection
    api.isOverCollection = function (orbA, collection) {
        var i = collection.orbs.length;
        while (i--) {
            var orbB = collection.orbs[i];
            if (utils.distance(orbA.x, orbA.y, orbB.x, orbB.y) <= orbB.radius) {
                return orbB
            }
        }
        return null;
    };
}
    (this['OrbCollection'] = {}));
