
var newFilled = function (len, val) {
    var i = len,
    arr = []; ;
    while (i--) {
        arr[i] = val;
    }
    return arr;
};

var byt = newFilled(8, 0);
byt[0] = 1;
console.log(byt.join('')); // '10000000'
