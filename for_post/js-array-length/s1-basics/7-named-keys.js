let a = [0, 1, 2];

a['zero'] = 0;
a['one'] = 1;
a['two'] = 2;

console.log(a.length); // 3
console.log(Object.keys(a).length); // 6