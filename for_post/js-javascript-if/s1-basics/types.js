var n = 42;

// with brackets
if (n === 42) {
    console.log('the answer');
}
// > 'the answer'

// without
if (n >= 40)
    console.log('the answer');
// > 'the answer'

if (n === '42') {
    console.log('the answer is a string');
} else {
    if (n === 42) {
        console.log('the answer is a number.')
    } else {
        console.log('no answer');
    }
}
// > 'the answer is a number'
