let text = 'this is some foo text that contains more than one foo';
 
let a = text.replace(/foo/, 'bar');
let b = text.replace(/foo/g, 'bar');
 
console.log(a);
// 'this is some bar text that contains more than one foo'
console.log(b);
// 'this is some bar text that contains more than one bar'
