// high order function that takes functions as arguments
// and uses a try catch when calling them
var highOrder = function (func, resolve, reject) {
    var result = { pass: false, mess: '' };
    try {
        result.mess = resolve( func() );
        result.pass = true;
    } catch (e) {
        try {
            result.mess = reject(e);
        } catch (e) {
            result.mess = e.message || 'reject method error with no message';
        }
    }
    return result;
};
// resolve and reject methods
var resolve = function (res) {
    return res;
};
var reject = function (e) {
    return e.message;
};
// error demo
var result = highOrder(function () {
        throw new Error('Causing an error in the first function');
        return 'foo'
    }, resolve, reject);
console.log(result); // { pass: false, mess: 'Causing an error in the first function' }
// no error demo
var result = highOrder(function () {
        return 'foo'
    }, resolve, reject);
console.log(result); // { pass: true, mess: 'foo' }
