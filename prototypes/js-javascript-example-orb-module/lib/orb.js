var orbMod = (function () {

    // Greatest Common Deviser
    var gcd = function (a, b) {
        if (!b) {
            return a;
        }

        return gcd(b, a % b);
    };

    // get the number I need to divide points by to get the simple ratio
    var getGcdFromPoints = function (points) {
        var ai = 0,
        d,
        gd = 1,
        bi;
        while (ai < points.length) {
            if (points[ai] < 1) {
                ai += 1;
                continue;
            }
            bi = 0;
            while (bi < points.length) {
                if (bi === ai || points[bi] < 1) {
                    bi += 1;
                    continue;
                }
                d = gcd(points[ai], points[bi]);
                if (points[ai] === points[bi]) {
                    d = 1;
                }
                if (d > gd) {
                    gd = d;
                }
                bi += 1;
            }
            ai += 1;
        }
        return gd;
    };

    // get the Element Stats based on the given points (or ratio)
    var getElStats = function (points) {
        var elStats = {
            ct: 0, // element count [0,4,0,0] = 1, [7,0,6,7] = 3
            i: [], // indexes of elements
            equalAll: false, // all elements equal each other (pure,dual,triple,and quad)
            gcd: getGcdFromPoints(points) // the gcd
        };
        // get count and indexes
        points.forEach(function (pt, i) {
            if (pt > 0) {
                elStats.ct += 1;
                elStats.i.push(i);
            }
        });
        // are all the Elements equal to each other?
        if (elStats.ct === 1) {
            elStats.equalAll = true;
        } else {
            elStats.i.forEach(function (i) {
                if (i + 1 < elStats.i.length) {
                    if (points[i] === points[elStats.i[i + 1]]) {
                        elStats.equalAll = true;
                    }
                }
            })
        }
        return elStats;
    };

    // get the simple ratio from a set of points (or simplify a ratio)
    // [0,0,14,2] => [0,0,7,1]
    var getSimpleRatio = function (points) {
        var gd = getGcdFromPoints(points),
        elStats = getElStats(points);
        // get simple ratio by diving all points by gd
        var simp = points.map(function (pt, i) {
                return pt / gd;
            });
        // special case for pure, dual, triple, and quad,
        // always assure the ratio is 1:1 based on stats from
        // elStats and not getGcdFromPoints
        if (elStats.equalAll) {
            elStats.i.forEach(function (i) {
                simp[i] = 1;
            });
        }
        return simp;
    };

    // set level when points, and ratio are valid
    var setLevel = function () {
        // for pure,dual,triple, and quad this will work
        this.level = this.points[this.elStats.i[0]];
        if (this.type === 'composite' || this.type === 'recipe') {
            var i = this.elStats.i[0];
            this.level = this.points[i] / this.ratio[i]
        }
    };

    // set orb values by a given ratio, and level
    var setByRatio = function (ratio, level) {
        var self = this;
        // set level, and ratio to given values
        this.level = level || 1;
        this.ratio = Array.from(ratio) || [1, 0, 0, 0];
        // make sure it is simple
        this.ratio = getSimpleRatio(this.ratio);
        // find points by multiplying simple ratio by level
        this.points = [];
        this.ratio.forEach(function (pt, i) {
            self.points[i] = pt * level;
        });
    };

    // set orb values based on a given points array
    var setByPoints = function (points) {
        var self = this;
        this.points = Array.from(points);
        this.ratio = [];
        // find the simple ratio
        this.ratio = getSimpleRatio(this.points);
    };

    // combine one or more orbs with this one
    var fromOrbs = function (orbs) {
        var points = [0, 0, 0, 0],
        tab = function (orb) {
            orb.points.forEach(function (pt, i) {
                points[i] += pt;
            });
        };
        // if Array of Orbs (combine, new from)
        if (orbs.constructor.name === 'Array') {
            orbs.forEach(function (orb) {
                tab(orb);
            });
            setByPoints.call(this, points);
        } else {
            // assume just single orb is given
            // then just set by the given orbs points (clone orb)
            setByPoints.call(this, orbs.points);
        }
    };

    var findType = function () {
        var oneCT = 0,
        nonOne = false;
        oneTypes = ['pure', 'dual', 'triple', 'quad'];
        // find count of 1's in the ratio
        this.ratio.forEach(function (pt) {
            if (pt === 1) {
                oneCT += 1;
            } else {
                if (pt != 0) {
                    nonOne = true;
                }
            }
        });
        // default to a type based on count of ones in ratio
        this.type = oneTypes[oneCT - 1];
        // if any value that is not 1 is in the ratio then default to composite
        if (nonOne) {
            this.type = 'composite';
        }
    };

    // the Orb constructor
    var Orb = function (opt) {
        var self = this;
        opt = opt || {};
        opt.points = opt.points || null;
        opt.ratio = opt.ratio || null;
        opt.level = opt.level || null;
        this.recipies = opt.recipies || [{
                    type: 'heal',
                    ratio: [0, 0, 2, 5]
                }
            ];
        // if points i opt, set by points
        if (opt.points) {
            setByPoints.call(this, opt.points);
        }
        // if ratio in opt, set by ratio, and level
        if (opt.ratio) {
            setByRatio.call(this, opt.ratio, opt.level);
        }
        // if orbs in opt set by one or more given orbs
        if (opt.orbs) {
            fromOrbs.call(this, opt.orbs);
        }
        // if just calling new Orb()
        if (!opt.points && !opt.ratio && !opt.orbs) {
            setByPoints.call(this, [1, 0, 0, 0]);
        }
        // set el stats
        this.elStats = getElStats(this.points);
        this.worth = 0;
        this.points.forEach(function (pt) {
            self.worth += pt;
        });
        findType.call(this);
        // set final level based on ratio, points, and type
        setLevel.call(this);
    };

    return Orb;

}
    ());