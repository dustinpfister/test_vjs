var itemClass = (function(){
    var DEFAULT_COLORS = ['#efefef', 'lime', 'blue', 'orange', 'purple'];
    // default pool of objects for each item class
    var DEFAULT_POOL = [
        { desc: 'Junk', range: [1000, 250] },
        { desc: 'Common', range: [300, 800] },
        { desc: 'Fair', range: [150, 500] },
        { desc: 'Rare', range: [50, 250] },
        { desc: 'Epic', range: [10, 100]}
    ];
    DEFAULT_POOL = DEFAULT_POOL.map(function(obj, i){ obj.color = DEFAULT_COLORS[i] || 'white'; return obj;  })
    // public api
    var api = {};
    // parse pool helper
    var parsePool = function(classes){
        return classes.pool.map(function(obj, i){
            obj.range = obj.range || [1, 1];
            var min = obj.range[0],
            max = obj.range[1], level;
            obj.levelPer = obj.levelPer === undefined ? 0 : obj.levelPer;
            level = classes.levelPer * classes.levelPerRatio + (1 - classes.levelPerRatio) * obj.levelPer;
            obj.points = min + (max - min) * level;
            obj.desc = obj.desc || '';
            obj.color = obj.color || DEFAULT_COLORS[i] || 'white';
            return obj;
        });
    };
    // create ITEM Classes object
    api.create = function(opt){
        opt = opt || {};
        var classes = {
            levelPer: opt.levelPer || 0,
            levelPerRatio: opt.levelPerRatio === undefined ? 1 : opt.levelPerRatio
        };
        // use given pool array or default starting pool
        classes.pool = opt.pool || DEFAULT_POOL;
        // parse given pool collection
        classes.pool = parsePool(classes);
        // get total points
        classes.totalPoints = classes.pool.reduce( function(acc, obj){ return acc + obj.points;}, 0);
        // set 0-1 numbs for each itemClasses object
        classes.pool = classes.pool.map( function(obj, i){ obj.per = obj.points / classes.totalPoints; obj.i = i; return obj; } );
        return classes;
    };
    // GET a random ITEM classes object
    api.getRandomItemClass = function(classes){
        var i = 0,
        len = classes.pool.length
        roll = Math.random(),
        item = false,
        n = 1;
        while(i < len){
            item = classes.pool[i];
            n -= item.per;
            if(roll > n){
                return item;
            }
            i += 1;
        }
        return item;
    };
    // return the public api
    return api;
}());
