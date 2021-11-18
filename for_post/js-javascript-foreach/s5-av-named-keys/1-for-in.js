let obj = {
    foo: 1,
    bar: 2,
    foobar: 3
},
sum = 0;
// using a for in loop
for (key in obj) {
    sum += obj[key];
}
console.log(sum); // 6
