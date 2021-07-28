var getXP = function(level){
    return 50 * level + Math.pow(2, level);
};

var getLevel = function(xp){
    // the problem now is how to get the value
    // for a when just xp is known
    var a = 6; 
    var y = xp - (50 * a);
    return Math.log(y) / Math.log(2);
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