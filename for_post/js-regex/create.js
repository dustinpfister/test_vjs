// when using the RegEx constructor backslashes must be doubled up.
let pat_datfile = new RegExp('dat_\\d+\\.json','gi');

console.log('dat_20120822.json'.match(pat_datfile));