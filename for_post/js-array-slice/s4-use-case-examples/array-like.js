var objToArray = function(obj) {
    return Array.prototype.slice.call(obj);
};

var obj = {
    0: 'a',
    1: 'b',
    length: 2
};

// so it would seem to work
var a = objToArray(obj);
console.log(a); //[ 'a', 'b' ]

// but there are also options like Array.from
console.log( Array.from(obj) );
//[ 'a', 'b' ] 