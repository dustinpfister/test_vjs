let text = '--- title: foo --- bla bla between --- other: stuff ---'
console.log(text.match(/---[\s|\S]*?---/g)[0]);
// --- title: foo ---