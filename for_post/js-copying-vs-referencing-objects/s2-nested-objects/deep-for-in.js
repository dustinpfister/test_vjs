// and example object to copy
var ref = {
    x: 32,
    y: 50,
    delta : {  // now we have an object in an object
        x : -1,
        y: 5
    }
};
 
// a deep clone method using for in
var forInCloneDeep = function (obj) {
    var n = {},
    prop;
    for (prop in obj) {
        // if a primitive just copy
        n[prop] = obj[prop];
        // if an object clone that too.
        if(typeof obj[prop] === 'object'){
            n[prop] = forInCloneDeep(obj[prop]);
        }
    }
    return n;
},
 
// works
pt = forInCloneDeep(ref);
pt.delta.x = 0;
pt.delta.y = 0;
console.log(ref.delta.x); // -1
console.log(pt.delta.x); // 0