let patt = /dat_\d+.json/ig,
str = 'Here is one file called dat_2017.json, and another called dat_2018.json';

console.log(patt.exec(str)); // ['dat_2017.json...'
console.log(patt.exec(str)); // ['dat_2018.json...'
console.log(patt.exec(str)); // null
console.log(patt.exec(str)); // ['dat_2017.json...'