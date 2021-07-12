
let onePlusNums = (arr) => {
    return arr.some((el) => {
        return typeof el === 'number';
    });

};

console.log( onePlusNums([1,2,3]) ); // true
console.log( onePlusNums([1,'2','3']) ); // true
console.log( onePlusNums(['1','foo', true]) ); // false
