let str = 'foo bar foo bar \n' +
    '---\n' +
    'foo: bar \n' +
    'n: 42 \n' +
    '---\n' +
    'foo bar foo bar';

let result = str.replace(/---\n[\s|\S]*?---\n/, (table) => {
        return table.replace(/---/, '<pre>')
        .replace(/---/, '</pre>');
    });

console.log(result);
