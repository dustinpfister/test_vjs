
var opt = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 3,  // default should be 2
    maximumFractionDigits: 4   // default should be 2
};
var formater = new Intl.NumberFormat('en-us', opt);

console.log(formater.format(1234.23456));
//$1,234.2346
console.log(formater.format(123));
//$123.000
