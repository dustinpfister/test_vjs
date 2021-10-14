let str = 'This is some foo text';

let a = str.match(/foo/);
console.log(typeof a, a.constructor.name); 'object' 'array'