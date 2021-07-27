
var createLevelDomain = function(levelCap){
    var level = 0,
    domain = [];
    while(level <= levelCap){
        domain.push(level);
        level += 1;
    }
    return domain;
};

var levelDomain = createLevelDomain(10);

console.log( levelDomain );