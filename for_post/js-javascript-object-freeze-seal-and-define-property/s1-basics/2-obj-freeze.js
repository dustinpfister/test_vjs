const obj = {
    n: 42
};

Object.freeze(obj);
obj.n = 40;
console.log(obj.n); // 42
