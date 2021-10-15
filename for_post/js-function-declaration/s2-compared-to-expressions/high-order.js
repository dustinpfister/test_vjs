// of course a function declatation can be
// given as an argument to another function
function foo(){
    return 'bar'
}
function foobar(bar){
    return 'foo' + bar();
}
console.log( foobar(foo) );