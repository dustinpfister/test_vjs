var b = typeof new Boolean(false); // 'object'
var c = typeof new Boolean(false).valueOf(); // 'boolean'

var foo = new Boolean(false),
n = 0;
if (foo) {
    n += 1;
}
console.log(n); // 1