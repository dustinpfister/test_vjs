// I have the level, I want xp

var parseByLevel = function(level){
    return 1000 + 50 * level + Math.pow(2, level);
};

var xp = parseByLevel(10);

console.log(xp);