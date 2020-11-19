var n = (function () {
    var result = [],
    len = 10,
    i = 0;
    while (i < len) {
        result.push(Math.pow(2, i));
        i += 1;
    }
    return result;
}
    ());
console.log( n.join(',') ); // '1,2,4,8,16,32,64,128,256,512'
