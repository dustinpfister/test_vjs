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

// set a given path to a source object to a given value,
// return an error object if something goes wrong, or empty object if all goes well
utils.setPath = function(sourceObj, pathStr, value){
   var propNames = pathStr.split('.');
   var i = 0, len = propNames.length,
   node = sourceObj, tNode;
   while(i < len){
      try{
          // if this is the last index in propNames
          // then set the value to the current object
          // stored in 'node'
          if(i === len - 1){
              node[propNames[i]] = value;
          }else{
              // else I need to create an object
              // for a given prop name if the key
              // is undefined, and update node var
              tNode = node[propNames[i]];
              // create new object if undefined
              if(tNode === undefined){
                  tNode = node[propNames[i]] = {};
              }
              // if tNode is not an object
              if(typeof tNode != 'object' || tNode === null){
                  return new Error('Property ' + propNames[i] + ' is not an object or is null.');
              }
              node = tNode;
          }
      }catch(e){
          return e;
      }
      i += 1;
   }
   return {};
};

//******** ********** ********** *********
// DOM
//******** ********** ********** *********

// create a canvas element
utils.createCanvas = function (opt) {
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () {
        return false;
    }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
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

//******** ********** ********** *********
// LOG
//******** ********** ********** *********

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
