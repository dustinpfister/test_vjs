function foobar(bar){
    return 'foo' + bar();
}
// expressions do not need to be defined first
console.log( foobar(function(){
    return 'baz'
}) );
