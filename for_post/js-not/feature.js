
var supportsCanvas = function () {
    try {
        return !!document.createElement('canvas').getContext('2d');
    } catch (e) {
        return false;
    }
};

console.log(supportsCanvas()); // false if nodejs, true if browser that supports 2d canvas