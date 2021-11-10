// not working on node 8.9.3
let text = 'this is some foo text that contains more than one foo';
let b = text.match(/foo/dg);
console.log(b.length); // 2
