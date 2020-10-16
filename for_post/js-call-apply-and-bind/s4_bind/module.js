// basic object
var obj = {
 
    x : 0,
    y : 0
 
},
 
// basic module example
mod = {
 
    x: 37,
    y: 50,
 
    // move by angle, and distance
    moveAD: function(angle, dist) {
 
        this.x += Math.cos(angle) * dist;
        this.y += Math.sin(angle) * dist;
 
    }
};
 
// moved by a distance of 100 by a 45 degree angle
mod.moveAD(Math.PI / 180 * 45,100);
 
console.log('*****');
console.log(obj.x +','+obj.y); // unchanged
console.log(mod.x +','+mod.y); // moved 100
 
// bind to obj
moveAD = mod.moveAD.bind(obj);
moveAD(0,100); // now use the method made with bind
 
console.log('*****');
console.log(obj.x +','+obj.y); // moved 100
console.log(mod.x +','+mod.y); // unchanged
 
// just calling the method dirrecly still works as exspected
mod.moveAD(Math.PI / 180 * 45,100);
console.log('*****');
console.log(obj.x +','+obj.y); // unchanged
console.log(mod.x +','+mod.y); // moved 100