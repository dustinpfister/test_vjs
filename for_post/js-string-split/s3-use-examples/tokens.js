
var tokens = function (string) {
    var patt_unwanted = /[,\?!]/g;
    return string.toLowerCase().replace(patt_unwanted, '').split(' ');
};

var text = 'Okay so then, this is some text! What do you think?',
arr = tokens(text),
wc = arr.length;

console.log(arr); 
// ['okay', 'so', 'then', 'this', 'is', 'some', 'text', 'what', 'do', 'you', 'think']
console.log(wc); // 11