var d = new Date();

// no pubic or private keys!?
console.log(Object.keys(d)); // []
console.log(Object.getOwnPropertyNames(d)); // []

try {
    var obj = {};
    console.log( Date.prototype.getFullYear.call(obj) );
} catch (e) {
    console.log(e.message); // this is not a Date object.
}
