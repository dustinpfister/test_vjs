// getFooIndex method using String.match that will
// return -1 when null is returned
let getFooIndex = (str, patt) => {
    let m = str.match(patt);
    // if not null return index
    if (m) {
        return m.index;
    }
    // else return -1
    return -1;
};

let str1 = 'This string has a foobar here';

console.log(getFooIndex(str1, /foo/)); // 18
console.log(getFooIndex(str1, /baz/)); // -1
