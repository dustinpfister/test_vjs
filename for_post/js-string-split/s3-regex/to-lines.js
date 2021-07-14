
var createLinesArray = function (text) {
    return text.split(/\n|\r\n/);
};

// Linux / Mac

var text1 = 'This is a line\n' +
'and then this is anoter. \n' +
'The end.';
console.log(createLinesArray(text1));
// [ 'This is a line', 'and then this is anoter. ', 'The end.' ]


var text2 = 'In Windows\r\n' +
'There is another pattern,\r\n' +
'used.';
console.log(createLinesArray(text2));
// [ 'In Windows', 'There is another pattern,', 'used.' ]