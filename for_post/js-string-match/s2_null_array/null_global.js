// getFooIndex method using String.match that will
// return -1 when null is returned
let getFooIndices = (str, patt) => {
    let m = str.match(patt);
    // if not null return index
    if (m) {
        if (m.index === undefined) {
            var result,
            indices = [];
            // use exec to get all
            while (result = patt.exec(str)) {
                indices.push(result.index);
            }
            return indices;
        }
        // just the one
        return [m.index];
    }
    // none
    return [];
};

let str1 = 'This foo example string is a string that has more than one foo';
console.log(getFooIndices(str1, /foo/g)); // [5, 59]
console.log(getFooIndices(str1, /foo/)); // [5]
console.log(getFooIndices(str1, /bar/g)); // []