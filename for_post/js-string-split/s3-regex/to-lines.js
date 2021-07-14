
var createLinesArray = function (text) {
    return text.split(/\n|[\r\n]/);
};

// Linux / Mac

var text1 = 'This is a line\n' +
'and then this is anoter. \n' +
'The end.';

console.log(createLinesArray(text1));