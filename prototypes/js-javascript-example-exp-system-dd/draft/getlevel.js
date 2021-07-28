
// get an xp object with just known level
var getXP = function(level){
    //return level * ( level - 1 ) * 500;
    //return level * ( level - 1 )
    //return 500 * Math.pow(level, 2) - 500 * level;
    return {
        a: Math.pow(level, 2),
        b: 500 * Math.pow(level, 2),
        c: 500 * level,
        d: 500 * Math.pow(level, 2) - 500 * level
    };
};

// trying to work out on inverse
var getLevel = function(xp){
    //return 500 / (Math.log(xp) / Math.log(2)) + (500 / xp);
    return {
        a: 0,
        b: 0,
        c: 0,
        d: xp
    };
};

// create table
var level = 1,
xp,
levelCap = 10,
table = [];
while(level <= levelCap){
    xp = getXP(level);
    table.push({
        level: level,
        xp: xp,
        //diff: getXP(level) - getXP(level - 1),
        inverse: getLevel(xp.d)
    });
    level += 1;
}

console.log(table);
