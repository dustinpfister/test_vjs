var array = [1, 2, 3];

// push
var push = function(array, what){
    [].splice.apply(array, [array.length, 0].concat(what));
}

push(array, [4,5,6]);


console.log(array); // 1-2-3
