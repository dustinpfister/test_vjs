
// get xp function when level is known
var getXP1 = function(level){
    return level * ( level - 1 ) * 500;
};
var getXP2 = function(level){
    return 500 * Math.pow(level, 2) - 500 * level;
};

// create table
var level = 1,
levelCap = 10,
table = [];
while(level <= levelCap){
    table.push({
        level: level,
        xp1: getXP1(level),
        xp2: getXP2(level)
    });
    level += 1;
}

console.log(table);
