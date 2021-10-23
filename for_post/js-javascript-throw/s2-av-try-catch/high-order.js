// high order function that takes functions as arguments
// and uses a try catch when calling them
var highOrder = function (func, resolve, reject) {
    try {
        return {
            pass: true,
            mess: resolve(func())
        };
    } catch (e) {
        try {
            return {
                pass: false,
                mess: reject(e)
            };
        } catch (e) {

            return {
                pass: false,
                mess: e.message
            }
        }
    }
};

// resolve and reject methods
var resolve = function (res) {
    return res;
};
var reject = function (e) {
    throw new Error('error in reject function');
    return e.message;
};

// error demo
var result = highOrder(function () {
        throw new Error('Just causing an error');
        return 'foo'
    }, resolve, reject);
console.log(result); // { pass: false, mess: 'Just causing an error' }
// no error demo
var result = highOrder(function () {
        return 'foo'
    }, resolve, reject);
console.log(result); // { pass: true, mess: 'foo' }
