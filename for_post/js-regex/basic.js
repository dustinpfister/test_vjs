let data = 'regexp is **good** for pattern matching tasks',

change = data.replace(/\*\*good\*\*/, 'great');

console.log(change); // 'regexp is great for pattern matching tasks'
