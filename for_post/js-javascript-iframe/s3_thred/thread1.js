console.log(document.body);

let out = document.createElement('p');
out.innerText = '';
document.body.appendChild(out);

var lt = new Date();
var loop = function () {

    setTimeout(loop, 100);

    var i = 100000000;
    while (i--) {};

   // log the time
    var secs = (new Date() - lt) / 1000;
    lt = new Date();
    out.innerText = secs;

};
loop();
