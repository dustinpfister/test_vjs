function foo(){
    return 'bar'
}

function foobar(bar){
    return 'foo' + bar();
}

console.log( foobar(foo) );