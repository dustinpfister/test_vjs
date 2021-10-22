// very basic callback example using setTimeout
console.log('one moment');
new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('delayed');
    }, 3000);
})
.then(function(mess){
    console.log(mess);
});