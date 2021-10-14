
var opt = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,  // default should be 2
    maximumFractionDigits: 4   // default should be 2
};
var formater = new Intl.NumberFormat('en-us', opt);

console.log(formater.format(1234.23456));
console.log(formater.format(123));
