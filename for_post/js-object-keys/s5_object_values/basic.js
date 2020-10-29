var obj = {
    x: 0,
    y: 35,
    attack: 12,
    hp : {
      current: 47,
      max: 50
    }
};
// so Object.keys for public keys
var keys = Object.keys(obj);
console.log(keys);
 // ["x", "y", "attack", "hp"]
 
// and Object.values for values of public keys
var values = Object.values(obj);
console.log(values);
// [ 0, 35, 12, { current: 47, max: 50 } ]