//var levelObj = XP.parseByXP(10, 100);

//console.log(levelObj);
var xpCap = 1000,
levelCap = 100;

var parseByXp = function(xp){
    xp = xp === undefined ? 0 : xp; //23.102118,
    var l = Percent.log3(xp, xpCap, 10, 0, 1) * levelCap
    return {
        xp: xp,
        l: l,
        level: Math.floor(l)
    };
};

console.log( parseByXp(23.102118) );

// can not figure out parse by level

// parseByLevel(1)