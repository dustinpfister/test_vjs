let str = 'This is some text that also ' +
'---\n' +
'foo: bar \n' +
'n: 42 \n' +
'---\n' + 
'has some tables in it, but I do not want theme there for some reason.';

let result = str.replace(/---\n[\s|\S]*?---\n/, '');

console.log(result);
// 'This is some text that also has some tables in it, but I do not want theme there for some reason.'
