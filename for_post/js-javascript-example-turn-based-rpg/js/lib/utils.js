// UTILS
var utils = {};

/********* ********** ********** *********/
// MISC
/********* ********** ********** *********/

// get a value by way of a per value (0-1), and a min and max value
utils.valueByRange = function(per, nMin, nMax){
    per = per === undefined ? 0 : per;
    nMin = nMin === undefined ? 0 : nMin;
    nMax = nMax === undefined ? 1 : nMax;
    return nMin + Math.round(per * (nMax - nMin));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// angle from one point to another
utils.angleToPoint = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? Math.PI * 2 : scale;
    var aTan = Math.atan2(y1 - y2, x1 - x2);
    return (aTan + Math.PI) / (Math.PI * 2) * scale;
};
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: Math.floor((e.touches ? e.touches[0].clientX : e.clientX) - bx.left),
        y: Math.floor((e.touches ? e.touches[0].clientY : e.clientY) - bx.top),
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};
// deep clone using JSON
utils.deepCloneJSON = function (obj) {
    try{
       return JSON.parse(JSON.stringify(obj));
    }catch(e){
        return {};
    }
};
// get a nested object node from a source object by path string
utils.getPath = function(sourceObj, pathStr, def){
   var propNames = pathStr.split('.');
   var node = sourceObj[propNames[0]];
   var i = 1, len = propNames.length;
   while(i < len){
      try{
          node = node[propNames[i]];
          if(node === undefined){
              return def;
          }
      }catch(e){
          return def;
      }
      i += 1;
   }
   return node;
};
/********* ********** ********** *********/
// log
/********* ********** ********** *********/

// basic log function
utils.log = function(mess, type){
    type = type || 'info';
    // if info type use console.log
    if(type === 'info'){
        console.log(mess);
        return;
    }
    // using console.log for debug also for now
    if(type === 'debug'){
        console.log(mess);
        return;
    }
    // if we get here use console.warn
    console.warn(mess);
};

/********* ********** ********** *********/
// HTTP
/********* ********** ********** *********/

// very simple http client
utils.http = function(opt){
    var opt = opt || {};
    // default options
    opt.url = opt.url || '';
    opt.method = opt.method || 'GET';
    opt.async = opt.async === undefined ? true: opt.async;
    opt.body = opt.body === undefined ? null: opt.body;
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    opt.responseType = opt.responseType || '';  // set to 'blob' for png
    // create and set up xhr
    var xhr = new XMLHttpRequest();
    xhr.responseType = opt.responseType;
    xhr.open(opt.method, opt.url, opt.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 400){
                opt.onDone.call(xhr, xhr.response, xhr);
            }else{
                opt.onError.call(xhr, xhr);
            }
        }
    };
    // send
    xhr.send(opt.body);
};

/********* ********** ********** *********/
// EXP SYSTEM
/********* ********** ********** *********/

// Basic experience point system methods
utils.XP = (function () {
    // default values
    var default_deltaNext = 50,
    defualt_cap = 100;
    // get level with given xp
    var getLevel = function (xp, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXP = function (level, deltaNext) {
        deltaNext = deltaNext === undefined ? default_deltaNext : deltaNext;
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    // parse a levelObj by XP
    var parseByXP = function (xp, cap, deltaNext) {
        //cap = cap === undefined ? default_cap : cap;
        var l = getLevel(xp, deltaNext);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXP(level + 1, deltaNext);
        return {
            level: level,
            levelFrac: l,
            per: l % 1,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        // use getXP method and then pass that to parseXP for utils.XP.parseByLevel
        parseByLevel: function (l, cap, deltaNext) {
            return parseByXP(getXP(l, deltaNext), cap, deltaNext);
        },
        // can just directly use parseByXP for utils.XP.parseByXP
        parseByXP: parseByXP
    };
}
    ());

/*
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
*/
