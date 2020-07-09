let a = ['foobar', 'foo', '27bar', false, 'chew', 'madfoochew', 'fooish', 24, 42, null, 'fool'];

let b = a.filter((str) => {
        return String(str).indexOf('foo') >= 0;
    });

console.log(b);
// [ 'foobar', 'foo', 'madfoochew', 'fooish', 'fool' ]
