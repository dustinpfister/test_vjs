let c = 0,
a = function bar() {
    console.log(5 + c);
    if (c < 5) {
        c++;
        bar();
    }
};

a();