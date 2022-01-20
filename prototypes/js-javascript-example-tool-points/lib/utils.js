var utils = {};

//-------- ----------
//  GEO
//-------- ----------

// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

//-------- ----------
//  DOM
//-------- ----------

utils.removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// get a canvas relative position that is adjusted for scale
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    return pos;
};

//-------- ----------
//  Object
//-------- ----------

// chunk and array
utils.chunk = function (arr, size) {
    var chunkedArr = [];
    arr = arr || [];
    size = size === undefined ? 1 : size;
    for (var i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};

// parse json in a pretty way
// https://stackoverflow.com/questions/6937863/json-stringify-so-that-arrays-are-on-one-line
utils.jsonPretty = (function(){
    // built in replacer
    var replacer = function(k, v){
        if(v instanceof Array){
            if(typeof v[0] === 'number'){
                return JSON.stringify(v);
            }
        }
        return v;
    };
    // public jsonPretty function
    return function(obj){
        return JSON.stringify(obj, replacer, 2)
        .replace(/\\/g, '')
        .replace(/\"\[/g, '[')
        .replace(/\]\"/g,']')
        .replace(/\"\{/g, '{')
        .replace(/\}\"/g,'}');
    };
}());

// parse an object with defaults
utils.defaults = function(obj, defaults){
    return Object.assign({}, defaults, obj);
};
