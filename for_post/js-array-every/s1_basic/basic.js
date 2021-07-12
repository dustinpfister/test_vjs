let arr = [1, 2, 3, 4]

let b = arr.every((el) => {
        return typeof el === 'number';
    });

console.log(b); // true
