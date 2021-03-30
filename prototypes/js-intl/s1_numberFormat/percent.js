var utils = {};
// format as percent
utils.format_percent = function (a, d, clamp) {
    clamp = clamp || false;
    var per = a;
    if (arguments.length === 2) {
        per = a / d;
    }
    if (clamp) {
        per = per < 0 ? 0 : per;
        per = per > 1 ? 1 : per;
    }
    var formatter = new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    return formatter.format(per);
};

console.log(utils.format_percent(.8925)); // 89%

console.log(utils.format_percent(3, 4)); // 75%


console.log(utils.format_percent(8, 4)); // 200%
console.log(utils.format_percent(8, 4, true)); // 100%