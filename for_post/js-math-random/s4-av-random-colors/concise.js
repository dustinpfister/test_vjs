var randomColor = function () {
    return '#' + Math.random().toString(16).substr(-6);
};

console.log( randomColor() );