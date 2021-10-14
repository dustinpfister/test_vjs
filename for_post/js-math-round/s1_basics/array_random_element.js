var getRandomEl = function (arr) {
    var len = arr.length;
    return arr[Math.floor(Math.random() * len)];
};
var i = 10,
colors = ['red', 'lime', 'cyan'];
while(i--){
    console.log( getRandomEl(colors) );
}