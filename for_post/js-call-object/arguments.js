
let func = function () {
 
    let p = 0;
 
    [].forEach.call(arguments, function (n) {
 
        p += n;
 
    });
 
    return p;
 
};
 
console.log(func(5,2,3)); // 10 

//let g = typeof window !== 'undefined' ? window : global;

//g.foo = 'bar';
