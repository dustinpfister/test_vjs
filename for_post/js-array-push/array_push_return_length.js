var arr = [],
obj;
while (arr.push({}) < 10) {
    obj = arr[arr.length - 1];
    obj.n = 0;
}
arr.pop();

console.log(arr);
