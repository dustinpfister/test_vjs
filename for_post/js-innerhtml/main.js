
var onfocus = function (e) {

    console.log(e);

};

document.getElementById('foo').addEventListener('focus', function () {

    console.log('foo');

});
