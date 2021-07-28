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

// create table
var level = 1,
levelCap = 10,
table = [];
while(level <= levelCap){
    table.push({
        level: level,
        obj: getObjByLevel(level)
    });
    level += 1;
}

console.log(table);
