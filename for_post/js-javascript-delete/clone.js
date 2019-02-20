var obj = {
    x: 15,
    y: 27,
    time: 300,
    lastCall: 30
};

// clone the object somehow
var objCopy = JSON.parse(JSON.stringify(obj));
delete objCopy.time;
delete objCopy.lastCall;

objCopy.x = 0;
objCopy.y += 3;

console.log(objCopy.x, objCopy.y); // 0 30
console.log(obj.x, obj.y); // 15 27
