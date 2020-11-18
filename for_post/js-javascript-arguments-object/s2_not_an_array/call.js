let func = function () {
 
    let i = 0;
 
    [].forEach.call(arguments, (n) => {
 
        i += n;
 
    });
 
    return i;
 
};
 
console.log( func(1,2,3,4,5)); // 15