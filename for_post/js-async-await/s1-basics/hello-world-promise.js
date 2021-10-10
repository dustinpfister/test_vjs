var helloWorld = function () {
    return 'Hello World';
};
var helloWorldAsync = async function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('Hello World');
        }, 3000)
    })
};

console.log(typeof helloWorld()); // 'string'
console.log(typeof helloWorldAsync()); // 'object'
