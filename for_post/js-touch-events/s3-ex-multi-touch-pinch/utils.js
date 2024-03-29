var utils = {};

// get pos object with values relative to the given event object,
// and element that defaults to e.target by default
utils.getElementRelative = function (e, elTarget, index) {
    index = index === undefined ? 0 : index;
    var el = elTarget || e.target,
    bx = el.getBoundingClientRect(),
    pos = {
        x: (e.touches ? e.touches[index].clientX : e.clientX) - bx.left,
        y: (e.touches ? e.touches[index].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // adjust for native canvas matrix size if a canvas element
    if (el.nodeName === 'CANVAS') {
        pos.x = Math.floor((pos.x / el.scrollWidth) * el.width);
        pos.y = Math.floor((pos.y / el.scrollHeight) * el.height);
    }
    return pos;
};

// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
