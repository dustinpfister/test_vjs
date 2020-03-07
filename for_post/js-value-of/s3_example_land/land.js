// Land Class
var Land = function (opt) {
    opt = opt || {};
    this.tax = opt.tax === undefined ? 0 : opt.tax;
    this.upkeep = opt.upkeep === undefined ? 0 : opt.upkeep;
    this.rent = opt.rent === undefined ? 0 : opt.rent;
};
Land.prototype.valueOf = function () {
    return this.rent - this.tax - this.upkeep;
};

// an assets array of Land Class
// instances
var assets = [
    new Land({
        tax: 300,
        upkeep: 100,
        rent: 450
    }), // 50 a tick
    new Land({
        tax: 400,
        upkeep: 150,
        rent: 700
    }) // 150 a tick
];

// add up money per tick
var m = assets.reduce(function (acc, land) {
        // I can just add here
        // thanks to value of
        return acc + land;
    });
console.log(m); // 200
