let str = '- This - is a -- test --- -- - -';
let patt = /-{2,3}/g;
console.log( str.match(patt) );
// [ '--', '---', '--' ]