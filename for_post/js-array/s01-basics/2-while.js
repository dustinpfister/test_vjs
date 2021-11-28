let a = [1, 2, 3, 4],
el,
i = 0,
len = a.length;
while (i < len) {
    a[i] = Math.pow(2, a[i]);
    i += 1;
}
console.log(a.join('-')); // '2-4-8-16'
