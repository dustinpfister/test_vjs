var arr = [17, 40, -15];
 
arr.getAnswer = function () {
    var sum = 0;
    [].forEach.call(this, function (el) {
        if (typeof el === 'number') {
            sum += el;
        }
    });
    return sum;
};
 
console.log(arr.getAnswer()); // 42