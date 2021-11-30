var randomColor = function (options) {
    options = options || ['white', 'black'];
    return options[Math.floor(options.length * Math.random())];
};

console.log(randomColor()) // black or white
console.log(randomColor(['red', 'lime', 'cyan', 'black', 'white']));

