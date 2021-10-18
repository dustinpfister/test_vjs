
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};

[].push.apply(obj, ['foo', 'man', 'chew']);
console.log( obj );
/*
{
    '0': 1,
    '1': 2,
    '2': 3,
    '3': 'foo',
    '4': 'man',
    '5': 'chew',
    length: 6
}
*/
