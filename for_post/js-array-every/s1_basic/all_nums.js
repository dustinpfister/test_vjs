
let allNums = (arr) => {
    return arr.every((el) => {
        return typeof el === 'number';
    });

};

console.log( allNums([1,2,3]) ); // true
console.log( allNums(['1','foo', true]) ); // false
