
var levelObj = XP.parseByLevel(7, 100, 10000);

var DPS = XP.applySkillPoints(levelObj, 0, {});

console.log( Number(DPS) );