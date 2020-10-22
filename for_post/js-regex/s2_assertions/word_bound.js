let text = 'thats excellent that we have some example text';
let patt = /\be\S+/ig;
console.log( text.replace(patt, 'match') );
// 'thats match that we have some match text'
