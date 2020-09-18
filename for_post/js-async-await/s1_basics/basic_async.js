
let foo = (delay) => {
    return async() => {
        await setTimeout(function () {
            return 1;
        }, delay);
    }
};

let bar = function () {
    console.log('start');
    await foo(3000);
    console.log('end');
};

bar();
