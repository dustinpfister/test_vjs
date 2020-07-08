var str = 'This might be the best site on javaScript';
// using split, splice, and join
var range = str.split('').splice(5, 5).join('');

console.log(range); // 'might'