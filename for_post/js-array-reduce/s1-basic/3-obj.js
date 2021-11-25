let objs = [
    { a: 5},
    { a: 2},
    { a: 3}
];

let reducer = (acc, n) => {
    return acc + n.a;
};

let n = objs.reduce(reducer, 0);

console.log(n);