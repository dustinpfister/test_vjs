var str = '<div><p>foo<\/p><\/div><div><span>bar<\/span><\/div>';

var m = str.match(/<div>(.*?)<\/div>/g);

console.log(m[1]); // <div><span>bar</span></div>