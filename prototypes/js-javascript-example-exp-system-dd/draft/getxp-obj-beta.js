// get xp
var getXP2 = function(level){
    return 500 * Math.pow(level, 2) - 500 * level;
};

var getObjByLevel = function(level){
    var a = Math.pow(level, 2),
    b = 500 * a,
    c = 500 * level,
    xp = b - c; 
    return {
        a: a,
        b: b,
        c: c,
        level: level,
        xp: xp
    };
};

var getObjByXP = function(xp){
    var a = 0,
    b = 0,
    c = 0,
    level = b + c;
    return {
        a: a,
        b: b,
        c: c,
        level: level,
        xp: xp
    };
};

// create table
var level = 1,
levelCap = 10,
table = [];
while(level <= levelCap){
    table.push({
        level: level,
        objByLevel: getObjByLevel(level),
        objByXP: getObjByXP( getObjByLevel(level).xp )
    });
    level += 1;
}

console.log(table);
