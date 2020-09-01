
var gameMod = {
    create: function () {
        return {
            maxSecs: 1,
            moneyPerSecond: 10,
            money: 0
        }
    },
    update: function (model, secs) {
        secs = secs > model.maxSecs ? model.maxSecs : secs;
        model.money += model.moneyPerSecond * secs;
    }
};

var state = {
    game: gameMod.create(),
    lt: new Date()
};

var loop = function () {
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
    gameMod.update(state.game, secs);
    console.log(state.game.money);
};

setInterval(loop, 250);
