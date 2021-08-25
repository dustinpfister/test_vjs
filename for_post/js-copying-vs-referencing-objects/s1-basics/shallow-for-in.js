// and example object to copy
var ref = {
    x: 32,
    y: 50
};
 
// a simple forInClone shallow cone method
var forInClone = function (obj) {
    var n = {},
    prop;
    for (prop in obj) {
        n[prop] = obj[prop];
    }
    return n;
},
 
// works
pt = forInClone(ref);
pt.x = 0;
console.log(ref.x); // 32