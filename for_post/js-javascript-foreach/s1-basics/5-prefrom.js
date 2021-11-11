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


let st = new Date();
let arr = createLargeArray(4000000);
console.log((new Date() - st) / 1000);

// forEach
st = new Date();
arr.forEach((obj) => {
    obj.s = obj.x + obj.y;
});

console.log((new Date() - st) / 1000);

st = new Date();
let i = arr.length, obj;
while (i--) {
    obj = arr[i];
    obj.s = obj.x + obj.y;
}

console.log((new Date() - st) / 1000);
