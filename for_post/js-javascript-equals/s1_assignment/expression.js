
let func1 = (a) => {
    return a == undefined ? 0 : a;
};

let func2 = (a) => {
    return a === undefined ? 0 : a;
};


console.log( func1() );     // 0
console.log( func1(null) ); // 0

console.log('');

console.log( func2() );     // 0
console.log( func2(null) ); // null