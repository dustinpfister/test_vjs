let strs = ['foo', 'man', 'chew'];

// so reduce can be used to join an array of strings
let reducer = (acc, str, i, arr) => {
    let term = i === arr.length - 1 ? '' : '-';
    return acc + str + term;
};
let s = strs.reduce(reducer, '');
console.log( s ); // 'foo-man-chew'

// however there is the array join method that can be used
console.log( strs.join('-') ); // 'foo-man-chew'