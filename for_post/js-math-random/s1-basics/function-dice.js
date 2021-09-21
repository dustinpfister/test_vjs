var rollDie = function (sides) {
    sides = sides === undefined ? 6 : sides;
    return Math.floor(Math.random() * sides) + 1;
};

var rollDice = function (dice) {
    dice = dice === undefined ? [6, 6] : dice;
    return dice.map(function (sides) {
        return rollDie(sides)
    });
};

console.log(rollDice());

console.log(rollDice([6, 6, 6, 6, 20]));
