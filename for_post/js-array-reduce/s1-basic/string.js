let strs = ['foo', 'man', 'chew'];

let reducer = (acc, str, i, arr) => {
    let term = i === arr.length - 1 ? '' : '-';
    return acc + str + term;
};

let s = strs.reduce(reducer, '');

console.log(s);