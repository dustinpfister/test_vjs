var wrapText = function (str, width) {
    var patt = new RegExp('(?![^\\n]{1,' + width + ')([^\\n]{1,' + width + '})\\s', 'g');
    return str.replace(patt, '$1\n');
};

console.log(wrapText('this is some test text', 10).split('\n'));
// [ 'this is', 'some test', 'text' ]
