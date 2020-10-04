let str1 = 'This string has a foobar here',
str2 = 'this string does not have that',

// getFooIndex method using String.match that will
// return -1 when null is returned
getFooIndex = (str) => {
    let m = str.match(/foo/);
    // if not null return index
    if (m) {
        return m.index;
    }
    // else return -1
    return -1;
};

console.log(getFooIndex(str1)); // 18
console.log(getFooIndex(str2)); // -1
