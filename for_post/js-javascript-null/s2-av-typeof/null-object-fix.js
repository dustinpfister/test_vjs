var func = function (obj,dx) {
    if (typeof obj === 'object' && obj != null) {
        return obj.x += dx;
    }
    return -1;
};

console.log(func({x:5},5)); // 10
console.log(func(null,5)); // -1