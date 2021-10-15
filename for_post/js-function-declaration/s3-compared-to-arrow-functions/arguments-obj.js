// declarations (and expressions) can
// make use of the arguments object which
// can come in handy
function add(){
  return Array.prototype.reduce.call(arguments, function(acc, n){
      return acc += typeof n === 'number' ? n: 0;
  }, 0);
};
console.log(add(1, 2, 3, 4)); // 10

var add2 = () => {
  return Array.prototype.reduce.call(arguments, function(acc, n){
      return acc += typeof n === 'number' ? n: 0;
  }, 0);
};
console.log(add2(1, 2, 3, 4)); // 10