var orbMod = (function () {

    var api = {};

    // get the simple ratio from a set of points (or simplify a ratio)
    // [0,0,14,2] => [0,0,7,1]
    var getSimpleRatio = function (points) {
        // make sure pure, dual, triple, and quad
        // work they way they should
        if(utils.allNonZeroEqual(points)){
            return points.map(function(el){
                return el === 0 ? 0 : 1;
            });
        }
        // if we get this far use utils.GDCFromArray
        var gcd = utils.GCDFromArray(points);
        // get simple ratio by diving all points by gd
        return points.map(function (pt, i) {
            return pt / gcd;
        });
    };

    // set orb values based on a given points array
    var setByPoints = function (orb, points) {
        orb.points = Array.from(points);
        // find the simple ratio
        orb.ratio = getSimpleRatio(orb.points);
        // find type
        findType(orb);
        return orb;
    };

    var findType = function (orb) {
        var oneCT = 0,
        nonOne = false,
        oneTypes = ['pure', 'dual', 'triple', 'quad'];
        // find count of 1's in the ratio
        orb.ratio.forEach(function (pt) {
            if (pt === 1) {
                oneCT += 1;
            } else {
                if (pt != 0) {
                    nonOne = true;
                }
            }
        });
        // default to a type based on count of ones in ratio
        orb.type = oneTypes[oneCT - 1];
        // if any value that is not 1 is in the ratio then default to composite
        if (nonOne) {
            orb.type = 'composite';
        }
    };

    // create and return an Orb Object
    api.create = function(opt){
        var orb = {};
        opt = opt || {};
        opt.points = opt.points || null;
        opt.ratio = opt.ratio || null;
        opt.level = opt.level || null;
        // if points i opt, set by points
        if (opt.points) {
            setByPoints(orb, opt.points);
        }
        // if just calling new Orb()
        if (!opt.points && !opt.ratio && !opt.orbs) {
            setByPoints(orb, [1, 0, 0, 0]);
        }
        return orb;
    };

    // create an orb from a collection of orbs
    api.fromOrbs = function (orbCollection) {
        var points = [0, 0, 0, 0],
        tab = function (a) {
            a.points.forEach(function (pt, i) {
                points[i] += pt;
            });
        };
        // if Array of Orbs (combine, new from)
        if (orbCollection.constructor.name === 'Array') {
            orbCollection.forEach(function (a) {
                tab(a);
            });
            var orb = setByPoints(api.create(), points);
            return orb;
        } else {
            // assume just single orb is given
            // then just set by the given orbs points (clone orb)
            return setByPoints(api.create(), orbCollection.points);
        }
    };

    return api;

}
    ());