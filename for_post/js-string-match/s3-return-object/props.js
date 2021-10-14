let str = 'This foo text is some foo type text';

let a = str.match(/foo/);
console.log(a.index); // 5
console.log(a.input); // 'This foo text is some foo type text'

let b = str.match(/foo/g);
console.log(b.index); // undefined
console.log(b.input); // undefined