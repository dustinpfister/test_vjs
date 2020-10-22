let text = 'thats excellent that we have some example text';
// pattern with a \b world bounder assertion
let patt = /\be\S+/ig;
console.log( text.replace(patt, 'match') );
// 'thats match that we have some match text'
