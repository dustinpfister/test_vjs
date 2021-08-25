let ref = {
    x: 32,
    y: 50,
    delta : {  // now we have an object in an object
        x : -1,
        y: 5
    }
};
ref.ref = ref; // oh boy, look out!
 
let copy = Object.assign({},ref);
copy.x = 0;
console.log(copy.x); // 0
console.log(ref.x); // 32