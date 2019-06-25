
let foo = (delay) => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, delay);
    })
};

let func = async function() {
    console.log('start');
    await foo(3000);
    console.log('end');
};
func();
