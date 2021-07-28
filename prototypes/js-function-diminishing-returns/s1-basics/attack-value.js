var dimReturn = function (n) {
    return 1 - 1 / (n + 1);
};

var getAttackValue = function (baseValue, skillBonus, skillPoints) {
    return parseFloat((baseValue + skillBonus * dimReturn(skillPoints)).toFixed(2));
};


console.log( getAttackValue(10, 25, 0) ); // 10
console.log( getAttackValue(10, 25, 5) ); // 30.83
console.log( getAttackValue(10, 25, 100) ); // 34.75
console.log( getAttackValue(10, 25, 5000) ); // 35