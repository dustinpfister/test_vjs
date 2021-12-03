// UTILS
var utils = {};
// angle from one point to another
utils.angleToPoint = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? Math.PI * 2 : scale;
    var aTan = Math.atan2(y1 - y2, x1 - x2);
    return (aTan + Math.PI) / (Math.PI * 2) * scale;
};
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.touches ? e.touches[0].clientX : e.clientX) - bx.left,
        y: (e.touches ? e.touches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
// deep clone using JSON
utils.deepCloneJSON = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

// https://stackoverflow.com/questions/7582001/is-there-a-way-to-test-circular-reference-in-javascript
utils.isCircularObject = function(node, parents){
    parents = parents || [];
    if(!node || typeof node != "object"){
        return false;
    }
    var keys = Object.keys(node), i, value;
    parents.push(node); // add self to current path      
    for(i = keys.length-1; i>=0; i--){
        value = node[keys[i]];
        if(value && typeof value == "object"){
            if(parents.indexOf(value)>=0){
                // circularity detected!
                return true;
            }
            // check child nodes
            if(arguments.callee(value, parents)){
                return true;
            }

        }
    }
    parents.pop(node);
    return false;
};

// a deep clone method that should work in most situations
utils.deepClone = (function () {
    // forInstance methods supporting Date, Array, and Object
    var forInstance = {
        Date: function (val, key, opt) {
            return new Date(val.getTime());
        },
        Array: function (val, key, opt) {
            // deep clone the object, and return as array
            var obj = utils.deepClone(val, opt);
            obj.length = Object.keys(obj).length;
            return Array.from(obj);
        },
        Object: function (val, key, opt) {
            return utils.deepClone(val, opt);
        }
    };
    // default forRecursive
    var forRecursive = function (cloneObj, sourceObj, sourceKey) {
        return cloneObj;
    };
    // default method for unsupported types
    var forUnsupported = function (cloneObj, sourceObj, sourceKey) {
        // not supported? Just ref the object,
        // and hope for the best then
        return sourceObj[sourceKey];
    };
    // return deep clone method
    return function (obj, opt) {
        var clone = {},
        conName,
        forIMethod; // clone is a new object
        opt = opt || {};
        opt.forInstance = opt.forInstance || {};
        opt.forRecursive = opt.forRecursive || forRecursive;
        opt.forUnsupported = opt.forUnsupported || forUnsupported;
        for (var i in obj) {
            // if the type is object and not null
            if (typeof(obj[i]) == "object" && obj[i] != null) {
                // recursive check
                if (obj[i] === obj) {
                    clone[i] = opt.forRecursive(clone, obj, i);
                } else {
                    // if the constructor is supported, clone it
                    conName = obj[i].constructor.name;
                    forIMethod = opt.forInstance[conName] || forInstance[conName];
                    if (forIMethod) {
                        clone[i] = forIMethod(obj[i], i, opt);
                    } else {
                        clone[i] = opt.forUnsupported(clone, obj, i);
                    }
                }
            } else {
                // should be a primitive so just assign
                clone[i] = obj[i];
            }
        }
        return clone;
    };
}
    ());
