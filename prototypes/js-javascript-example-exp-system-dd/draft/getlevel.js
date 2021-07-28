
// get xp function when level is known
var getXP = function(level){
    //return level * ( level - 1 ) * 500;
    return level * ( level - 1 )
};

// working out on inverse
var getLevel = function(xp){
    return 2 / xp;
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
        inverse: getLevel(xp)
    });
    level += 1;
}

console.log(table);
