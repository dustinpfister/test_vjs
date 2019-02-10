var str = '<div><p>foo<\/p><\/div><div><span>bar<\/span><\/div>';

var r = str.replace(/<p>(.*?)<\/p>/g,'');

console.log(r); // <div></div><div><span>bar</span></div>