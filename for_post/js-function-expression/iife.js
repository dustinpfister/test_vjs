var mod = (function () {
 
    let api = function () {
        return 'bar';
    };
 
    api.bar = function () {
        return 'foo';
    }
 
    return api;
}
    ());
 
console.log(mod()); // 'bar'
console.log(mod.bar()); // 'foo'
