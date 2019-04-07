let fromObj = function (obj) {
    let arr = [];
    Object.values(obj).forEach((val) => {
        arr.push(val)
    });
    return arr;
};

let obj = {
    0: 'bar',
    1: 42,
    3: false
};


console.log(fromObj(obj).length); // 3

// deleting the source object
delete obj[1];

console.log(fromObj(obj).length); // 2