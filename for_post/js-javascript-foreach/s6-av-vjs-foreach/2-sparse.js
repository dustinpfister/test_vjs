let forEach = function (obj, func, opt) {
    // options object with sparse mode set to false by default
    opt = opt || {};
    opt.sparse = opt.sparse || false;
    var i = 0, keys = Object.keys(obj), len = keys.length;
    if(opt.sparse){
       // in sparse mode only use keys.length if there is no length prop in the object
       // else use the length value in the object
       len = obj.length === undefined ? keys.length: obj.length;
    }
    // loop
    while (i < len) {
        var key = keys[i],
        value = obj[keys[i]];
        if(opt.sparse){
            key = i;
            value = obj[i];
        }
        if (func.call(obj, value, key, obj)) {
            break;
        }
        i += 1;
    }
};

// creating a sparse array
let obj = {0: 1, 3: 2, 4: 3};
Object.defineProperty(obj, 'length', {value: 5});
let b = Array.prototype.map.call(obj, function(n){ return n; });
// by default it will skip over undefined keys just like with Array.forEach
forEach(b, (n) => {
    console.log(n);
});
// 1 2 3

forEach(b, (n) => {
    console.log(n || 0);
}, {sparse: true});
// 1 0 0 2 3
 