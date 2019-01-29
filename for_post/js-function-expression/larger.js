let foo = true;
let n = 10 + (function () {
    if (foo) {
        return 38;
    }
    return 2
}
    ()) - 6;
 
console.log(n); // 42