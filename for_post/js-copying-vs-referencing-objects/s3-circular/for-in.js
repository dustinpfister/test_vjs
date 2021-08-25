// and example object to copy
var ref = {
    x: 32,
    y: 50,
    delta : {  // now we have an object in an object
        x : -1,
        y: 5
    }
};
ref.ref = ref; // oh boy, look out!
 
var forInCloneDeep = function (obj) {
    var n = {},
    prop;
    for (prop in obj) {
        // if a primitive just copy
        n[prop] = obj[prop];
        // if an object clone that too.
        if(typeof obj[prop] === 'object'){
           // is this a reference to the object itself?
           if(obj[prop] === obj){
                // then make the reference, but to the new object
                // and don't even try to clone it.
                n[prop] = n;
            }else{
                // we should be able to do this safe
                n[prop] = forInCloneDeep(obj[prop]);
            }
        }
    }
    return n;
};