let str = 'This is - text with some - stuff going on';
console.log( str.match(/--/) );  // null
console.log( str.match(/--*/) ); // ['-', index: 8]
console.log( str.match(/--+/) ); // null
