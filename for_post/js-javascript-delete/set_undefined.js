var obj = {
    x: 15,
    y: 27
};
obj.y = undefined;
console.log(Object.keys(obj).length); // 2
delete obj.y;
console.log(Object.keys(obj).length); // 1
