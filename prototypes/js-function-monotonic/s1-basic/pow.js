var pow = function (i) {
    return Math.pow(2, i);
};
var i = 0,
len = 10,
results = [];
while(i < len){
    results.push( pow(i) );
    i += 1;
}
console.log(results);
