let global = 'a global';
 
(function () {
 
    let notGlobal = 'not a global';
 
    console.log(global); // 'a global'
    console.log(notGlobal); // not a global
 
}
    ());
 
console.log(global); // 'a global'
 
try {
 
    console.log(notGlobal);
 
} catch (e) {
 
    console.log(e.message); // 'notGlobal is not defined'
 
}
