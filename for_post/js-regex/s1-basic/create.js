// when using the RegEx constructor backslashes must be doubled up.
let pat_datfile = new RegExp('dat_\\d+\\.json','gi');

console.log('filename: dat_20120822.json'.match(pat_datfile)[0]);
// 'dat_20120822.json'

// or the literal syntax can be used.
let pat_datfile_lit = /dat_\d+.json/gi;

console.log('-- dat_20120822.json -- dat_2013.json'.match(pat_datfile)[1]);
// 'dat_2013.json'