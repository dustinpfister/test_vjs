var getPrice = function (cost, markup) {
    return Math.ceil(cost * markup) - 0.01;
};
var i = 10,
markup = 1.25;
while (i > 5) {
    var cost = 1 + i;
    console.log(cost, markup, getPrice(cost, markup));
    i--;
}
