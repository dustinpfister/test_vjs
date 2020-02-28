var str = "{f7--!", // not valid json
obj;
try {
    obj = JSON.parse(str);
} catch (e) {
    obj = {
        x: 0,
        y: 0
    };
}
console.log(obj.x, obj.y); // 0 0
