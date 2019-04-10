// a string with many instances of 'foo'
let str = 'Okay so here is 20190410.js and 20190410.html, you might also want to check out 20180410.js';
// 16 32 80
let createIndexObjects = (str) => {

    let patt = /\d+(\.js|\.html)/,
    arr = [],
    m,
    i = 0;

    // loop while m is true
    do {

        // get match from a substring from the current
        // index
        m = str.substring(i).match(patt);

        // break if null
        if (!m) {
            break;
        }

        // step index by index of match plus the size
        // of the pattern match string
        i += m.index + m[0].length;

        // adjust m.index to reflect index values
        // in original string rather than the substring
        m.index = i - m[0].length;

        // push the match object
        arr.push(m);

    } while (m);

    // return the array
    return arr;

};

console.log(createIndexObjects(str));
