var utils = {};
// format a decimal
utils.format_decimal = function (n,) {
    
    var formatter = new Intl.NumberFormat('en-US', {
            style: 'decimal',
             maximumFractionDigits: 4
        });
    return formatter.format(n);
};

console.log(utils.format_decimal(5478.12345678)); // '5,478.1235'
