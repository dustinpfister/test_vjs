var itemClass = (function(){
    // default pool of objects for each item class
    var DEFAULT_POOL = [
        { desc: 'Junk', color: '#efefef', points: 1000 },
        { desc: 'Common', color: 'lime', points: 250 },
        { desc: 'Fair', color: 'blue', points: 160 },
        { desc: 'Rare', color: 'orange', points: 80 },
        { desc: 'Epic', color: 'purple', points: 15}
    ]
    // public api
    var api = {};
    // create ITEM Classes object
    api.create = function(opt){
        opt = opt || {};
        var classes = {};
        classes.pool = opt.pool || DEFAULT_POOL;
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
        n = 1
        while(i < len){
            var item = classes.pool[i];
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
