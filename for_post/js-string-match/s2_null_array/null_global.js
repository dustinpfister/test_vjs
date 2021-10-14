// getFooIndex method using String.match that will
// return -1 when null is returned
let getFooIndex = (str, patt) => {
    let m = str.match(patt);
    // if not null return index
    if (m) {
        if (m.index === undefined) {
            var result,
            indices = [];
            while (result = patt.exec(str)) {
                indices.push(result.index);
            }
            return indices;
        }
        //return m.index;
    }
    // else return -1
    return -1;
};

let str1 = 'This foo example string is a string that has more than one foo';
console.log(getFooIndex(str1, /foo/g)); // [5, 59]
