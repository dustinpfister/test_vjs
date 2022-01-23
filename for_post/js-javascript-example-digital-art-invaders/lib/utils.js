var utils = {};
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

// get a value by way of a per value (0-1), and a min and max value
utils.valueByRange = function(per, a, b){
    per = per === undefined ? 0 : per;
    var nMin, nMax;
    if(typeof a === 'object'){
        nMin = a[0];
        nMax = a[1];
    }else{
        nMin = a === undefined ? 0 : a;
        nMax = b === undefined ? 1 : b;
    }
    return nMin + Math.round(per * (nMax - nMin));
};
// create a canvas element
utils.createCanvas = function(opt){
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
    opt.canvas.onselectstart = function () { return false; }
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// bounding box
utils.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2);
};
//******** **********
//  ANGLES
//******** **********
// PI * 2
utils.PI2 = Math.PI * 2;
// unit conversion
utils.degToRad = function(n){
   return utils.mod(n, 360) / 360 * utils.PI2;
};
// normalize an angle by half
utils.normalizeHalf = function (n, scale) {
    var c = scale || utils.PI2,
    h = c / 2;
    return utils.mod(n + h, c) - h;
};
