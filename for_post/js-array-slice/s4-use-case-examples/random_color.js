
var randomColor = function () {
    return '#' + Math.random().toString(16).split('').slice(-6).join('')
};

console.log(randomColor());