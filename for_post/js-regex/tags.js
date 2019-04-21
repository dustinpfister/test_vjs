let html = '<p>This is some html with a <a href=\"https://foo.com\">link<\/a> in it<\/p>',
html_nolinks = html.replace(/<a [^>]*>|<\/a>/gi,'');

console.log(html);
// <p>This is some html with a <a href="https://foo.com">link</a> in it</p>
console.log(html_nolinks);
// <p>This is some html with a link in it</p>