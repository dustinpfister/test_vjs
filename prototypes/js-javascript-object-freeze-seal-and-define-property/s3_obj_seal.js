const obj = {
    n: 42
};

Object.seal(obj);
obj.n = 40;
console.log(obj.n); // 40
obj.a = 7;
console.log(obj.a); // undefined
