console.log('foo script runing...');
var out = document.getElementById('out');
var i = 10;
while (--i) {
    var li = document.createElement('li');
    li.innerText = 10 - i;
    out.appendChild(li);
}
