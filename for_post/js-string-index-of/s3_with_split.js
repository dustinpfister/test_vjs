let getIndexValues = (str, substr, sep) => {
    let index = 0;
    sep = sep === undefined ? ' ' : sep;
    return str.split(sep).map((word, wordIndex) => {
        let i = word.indexOf(substr),
        b;
        if (i >= 0) {
            b = index + i;
        } else {
            b = -1;
        }
        index += word.length + sep.length;
        return b;
    }).filter((i) => {
        return i != -1;
    });
};

let str = 'This is all foobar and foo as well as bar';
console.log(getIndexValues(str, 'foo')); // [ 12, 23 ]
