var utils = {};

//-------- ----------
//  Array
//-------- ----------

// chunk and array
utils.chunk = function (arr, size) {
    var chunkedArr = [];
    arr = arr || [];
    size = size === undefined ? 1 : size;
    for (var i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};

//-------- ----------
//  Object
//-------- ----------

// parse an object with defaults
utils.defaults = function(obj, defaults){
    return Object.assign({}, defaults, obj);
};