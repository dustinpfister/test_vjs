var now = new Date();

// the constructor property is a reference to the
// constructor function that constructed the object
var then = new now.constructor(2009,1,13,18,31,30,321);
console.log(then.getTime()); // 1234567890321

// there is a name property that is also useful
console.log(now.constructor.name); // 'Date';
