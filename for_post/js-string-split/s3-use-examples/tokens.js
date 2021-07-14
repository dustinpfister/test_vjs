
var tokens = function (string) {
    return string.toLowerCase().split(' ');
};

var text = 'This is some text',

wc = tokens(text).length;

console.log(wc); // 4