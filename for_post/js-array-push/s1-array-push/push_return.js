var arr = [], obj;
do {
    obj = {};
    obj.n = 0;
} while (arr.push(obj) < 10)
console.log(arr);
//[{n:0},{n:0},{n:0},{n:0},{n:0},{n:0},{n:0},{n:0},{n:0}]
