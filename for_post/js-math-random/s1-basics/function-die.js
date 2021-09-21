var rollDie = function (sides) {
    sides = sides === undefined ? 6 : sides;
    return Math.floor(Math.random() * sides) + 1;
};

console.log( rollDie() );

console.log( rollDie(20));