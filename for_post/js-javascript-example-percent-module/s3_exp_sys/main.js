//var levelObj = XP.parseByXP(10, 100);

//console.log(levelObj);

var xpCap = 10000,
levelCap = 20;
/*
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
*/

// can not figure out parse by level by expression so I might need a table
// parseByLevel(1)

var createtable = function(){
    var level = 0,
    table = [];
    while(level < levelCap){
        table.push(Percent.log3(level, levelCap, 20, 0, 1) * xpCap);
        level += 1;
    }
    return table;
};

var table = createtable();
console.log(table);
