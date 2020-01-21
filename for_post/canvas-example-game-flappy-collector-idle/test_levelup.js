var berryLevelCheck = function (bird) {
    var e = Math.floor(Math.log(bird.berriesCollected) / Math.log(2));
    console.log(e);
    bird.berryLevel = e >= 6 ? e - 4 : 1;
};

var bird = {
    berriesCollected: 128
};

berryLevelCheck(bird);

console.log(bird);
