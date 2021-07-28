var dimReturn = function (n) {
    return 1 - 1 / (n + 1);
};

var getAttackValue = function (baseValue, skillBonus, skillPoints) {
    return parseFloat((baseValue + skillBonus * dimReturn(skillPoints)).toFixed(2));
};



/*
console.log(dimReturn(0)); // 0
console.log(dimReturn(0.5));
console.log(dimReturn(5));
console.log(dimReturn(50));
console.log(dimReturn(500));
*/