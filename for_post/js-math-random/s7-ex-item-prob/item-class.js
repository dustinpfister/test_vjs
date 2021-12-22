var itemClass = (function(){
    // default pool of objects for each item class
    var DEFAULT_POOL = [
        { desc: 'Junk', points: 1000 },
        { desc: 'Common', points: 250 },
        { desc: 'Fair', points: 160 },
        { desc: 'Rare', points: 80 },
        { desc: 'Epic', points: 15}
    ]
    // public api
    var api = {};
    // create ITEM Classes object
    api.create = function(opt){
        opt = opt || {};
        opt.pool = opt.pool || DEFAULT_POOL;
        // get total points
        opt.totalPoints = opt.pool.reduce( function(acc, obj){ return acc + obj.points;}, 0);
        // set 0-1 numbs for each itemClasses object
        opt.pool = opt.pool.map( function(obj, i){ obj.per = obj.points / opt.totalPoints; obj.i = i; return obj; } );
        return opt;
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
 
    return api;
}());
