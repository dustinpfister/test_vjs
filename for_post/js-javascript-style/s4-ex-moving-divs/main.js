// create children
var createChildren = function (div) {
    var i = 10;
    while (i--) {
        var child = document.createElement('div');
        child.className = 'div_child';
        child.id = 'child_' + i;
        child.dataset.x = 10;
        child.dataset.y = 10;
        div.appendChild(child);
    }
};
// update children using the STYLE API
var updateChildren = function (div) {
    [].forEach.call(div.children, function (child) {
        var x = child.dataset.x,
        y = child.dataset.y;
        child.style.left = x + 'px';
        child.style.top = y + 'px';

    });
};
// get ref to parent div
var div_parent = document.querySelector('.div_parent');
// create and append child divs to the parent div
createChildren(div_parent);
var lt = new Date();
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs >= 1 / 30) {
        updateChildren(div_parent);
        lt = now;
    }
};
loop();


