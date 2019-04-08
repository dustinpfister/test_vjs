let str = 'Some numbers for you are 2, 6, and 10 also.',

result = str.replace(/\d+/g, (num) => Math.pow(2, num));

console.log(result);
// 'Some numbers for you are 4, 64, and 1024 also.'
