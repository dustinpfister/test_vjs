let a = [1, 'a', 2, 'b', 3];
// so yes reduce can be used for filtering
let c = a.reduce((acc, el) => {
        if (typeof el === 'number') {
            acc.push(el)
        }
        return acc;
    }, []);
console.log(c);  // [1, 2, 3]
// but why not just use filter
let b = a.filter((el) => {
        return typeof el === 'number';
    });
console.log(b); // [1, 2, 3]

