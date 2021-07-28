
// get xp function when level is known
var getXP = function(level){
    return level * ( level - 1 ) * 500;
};

// create table
var level = 1,
levelCap = 10,
table = [];
while(level <= levelCap){
    table.push({
        level: level,
        xp: getXP(level)
    });
    level += 1;
}

console.log(table);
