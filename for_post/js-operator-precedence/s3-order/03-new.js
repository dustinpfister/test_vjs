// the new keyword is used to create custom objects
var MyObj = function(n){
    this.n = n;
};
MyObj.prototype.valueOf = function(){
    return this.n;
}

let a = new MyObj(5 + 10) * 2
console.log(a); // 30

let b = new MyObj(5) * (10 + 2);
console.log(b); // 60