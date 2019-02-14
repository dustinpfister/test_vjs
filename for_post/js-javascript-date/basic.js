let now = new Date(2019,1,14);
console.log(typeof now); // 'object'
console.log(now.constructor.name); // 'Date'
console.log(now.toDateString()); // 'Thu Feb 14 2019'