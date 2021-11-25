let objs = [{ a: 5, b:3},{},{ a: 2},{ a: 3, b: 0},{}];
 
// reduce can be used to filer like this
let a = objs.reduce((acc, el) => {
    if (el.a != undefined && el.b != undefined) {
        acc.push(el);
    }
    return acc;
}, []);
console.log(a); // [ { a: 5, b: 3 }, { a: 3, b: 0 } ]
 
// however there is also the array filter method that
// might prove to be a more appropriate choice
let b = objs.filter((el)=>{
    return el.a != undefined && el.b != undefined
});
console.log(b); // [ { a: 5, b: 3 }, { a: 3, b: 0 } ]
