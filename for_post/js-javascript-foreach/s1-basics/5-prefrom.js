let createLargeArray = (count) => {
    count = count || 10000;
    let i = 0,
    arr = [];
    while (i < count) {
        arr.push({
            i: i,
            x: Math.random(),
            y: Math.random()
        });
        i += 1;
    }
    return arr;
};

let getSecs = function (st) {
    return (new Date() - st) / 1000;
};

// create a large array
let st = new Date();
let arr = createLargeArray(2000000);
console.log('It took ' + getSecs(st) + ' seconds to create an array of ' + arr.length + ' elements');

// forEach
st = new Date();
arr.forEach((obj) => {
    obj.s = obj.x + obj.y;
});

console.log('It took ' + getSecs(st) + ' seconds to loop over the array using Array.forEach');

st = new Date();
let i = arr.length, obj;
while (i--) {
    obj = arr[i];
    obj.s = obj.x + obj.y;
}

console.log('It took ' + getSecs(st) + ' seconds to loop over the array using a while loop');

//It took 1.468 seconds to create an array of 2000000 elements
//It took 1.875 seconds to loop over the array using Array.forEach
//It took 0.062 seconds to loop over the array using a while loop