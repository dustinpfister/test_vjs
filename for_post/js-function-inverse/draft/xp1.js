var getXP = function(level){
    return Math.pow(2, level);
};

var getLevel = function(xp){
    return Math.log(xp) / Math.log(2);
};

var level = 0,
levelCap = 10,
results = [];

while(level <= levelCap){
    var xp = getXP(level);
    results.push({
        level: level,
        getXP: xp,
        getLevel: getLevel(xp),
        pass: getLevel( getXP(level) ) === level
    });
    level += 1;
}

console.log(results);