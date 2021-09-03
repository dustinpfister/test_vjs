var utils = {};

/********* ********** ********** *********/
//  HTTP
 /********* ********** ********** *********/

// very simple http client
utils.http = function(opt){
    var opt = opt || {};
    // default options
    opt.url = url || '';
    opt.body = opt.body || 'GET';
    opt.async = opt.async === undefined ? true: opt.async;
    opt.body = opt.body === undefined ? null: opt.body;
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onDone || utils.noop;
    // create and set up xhr
    var xhr = new XMLHttpRequest();
    xhr.open(opt.method, opt.url, opt.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 400){
                opt.onDone.call(xhr, xhr);
            }else{
                opt.onError.call(xhr, xhr);
            }
        }
    };
    // send
    xhr.send(opt.body);
};

/********* ********** ********** *********/
//  MISCELLANEOUS METHODS
 /********* ********** ********** *********/

// no operation ref
utils.noop = function () {};

// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};

// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};


/********* ********** ********** *********/
//  BASIC EXP SYSTEM
 /********* ********** ********** *********/

// Basic experience point system methods
utils.XP = (function () {
    // default values
    var default_deltaNext = 50,
    defualt_cap = 100;
    // get level with given xp
    var getLevel = function (xp, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXP = function (level, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse a levelObj by XP
    var parseByXP = function (xp, cap, deltaNext) {
        //cap = cap === undefined ? default_cap : cap;
        var l = getLevel(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXP(level + 1);
        return {
            level: level,
            levelFrac: l,
            per: l % 1,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        // use getXP method and then pass that to parseXP for utils.XP.parseByLevel
        parseByLevel: function (l, cap, deltaNext) {
            return parseByXP(getXP(l, deltaNext), cap);
        },
        // can just directly use parseByXP for utils.XP.parseByXP
        parseByXP: parseByXP
    };
}
    ());
