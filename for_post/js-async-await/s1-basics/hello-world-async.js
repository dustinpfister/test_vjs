var helloWorld = function () {
    return 'Hello World';
};
var helloWorldAsync =  async function () {
    return 'Hello World';
};

console.log(typeof helloWorld());      // 'string'
console.log(typeof helloWorldAsync()); // 'object'
