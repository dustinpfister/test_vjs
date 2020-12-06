let obj = {
    0: 5,
    1: 7,
    2: 1,
    40: 3,
    41: 7,
    42: 12
};

console.log(Object.keys(obj).length); // 6 public (enumerable) keys

// setting elements to undefined or null will not
// effect the number of public keys
obj[0] = undefined;
obj[1] = null;
console.log(Object.keys(obj).length); // 6 public (enumerable) keys

// setting an empty key to undefined will count as a public key
obj[3] = undefined;
console.log(Object.keys(obj).length); // 7 public (enumerable) keys

// The delete operator will actually delete a key
delete obj[0];
delete obj[1];
delete obj[2];
delete obj[3];
delete obj[4];
delete obj[5];
console.log(Object.keys(obj).length); // 3 public (enumerable) keys
