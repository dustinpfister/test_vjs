
let foo = (delay) => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, delay);
    });
};

let bar = function () {
    console.log('start');
    return foo(3000).then(() => {
        console.log('end');
    });
};

bar();
