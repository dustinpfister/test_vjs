
var opt = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
};
var formater = new Intl.NumberFormat('en-us', opt);

console.log(formater.format(1234.23456));
console.log(formater.format(123));
