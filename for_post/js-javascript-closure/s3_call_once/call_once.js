// call a function just one time
let callOnce = (func) => {
    let calls = 1;
    return function () {
        if (calls > 0) {
            func.apply(null, arguments);
            calls--;
        }
    };
};

// create a method that will just log a message once
let createLogOnce = () => {
    return callOnce((mess) => {
        console.log(mess);
    });
};

let trap = createLogOnce();

trap('okay'); // 'okay' logged to the console
trap('nope'); // (nothing)
trap('nope'); // (nothing)
trap('nope'); // (nothing)
