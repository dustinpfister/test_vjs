// say I have a source array like this
// and I want a new array that is just numbers
let sourceArray = [1, 'a', null, 2, {}, 3];

// I could work out something like this, using a function,
// while loop, and an if statement.
let onlyNums = (source) => {
    let newArr = [],
    el,
    len = source.length,
    i = len;
    while (i--) {
        el = source[len - 1 - i];
        if (typeof el === 'number') {
            newArr.push(el);
        }
    }
    return newArr;
};

// and that of course will work just fine
console.log(onlyNums(sourceArray)); // [1,2,3]

// however another option would be to just use array.filter
// with just the expression of interest that will produce the return
// value for the method that I pass to Array.filter
let onlyNums_filter = (source) => {
    return source.filter((el) => {
        return typeof el === 'number'
    });
};

// which also works just fine
console.log(onlyNums_filter(sourceArray)); // [1,2,3]
