// create children
var createChildren = function (div) {
    var i = 10;
    while (i--) {
        var child = document.createElement('div');
        child.className = 'div_child';
        child.id = 'child_' + i;
        child.dataset.x = 100;
        child.dataset.y = 100;
        child.dataset.pps = 32 + Math.round(64 * Math.random());
        child.dataset.rps = -Math.PI * 0.5 + Math.PI * 1 * Math.random();
        child.dataset.heading = Math.PI * 2 * Math.random();
        div.appendChild(child);
    }
};
// update children using the STYLE API
var updateChildren = function (div, secs) {
    [].forEach.call(div.children, function (child) {
        var x = parseFloat(child.dataset.x),
        y = parseFloat(child.dataset.y),
        heading = parseFloat(child.dataset.heading),
        pps = parseInt(child.dataset.pps);
        // move by heading and pps
        x += Math.cos(heading) * pps * secs;
        y = y += Math.sin(heading) * pps * secs;
        // update heading
        heading += parseFloat(child.dataset.rps) * secs;
        heading %= Math.PI * 2;
        child.dataset.heading = heading;
        // wrap
        x = x < 0 ? parseInt(div.scrollWidth) - 20 : x;
        x = x > parseInt(div.scrollWidth) - 20 ? 0 : x;
        y = y < 0 ? parseInt(div.scrollHeight) - 20 : y;
        y = y > parseInt(div.scrollHeight) - 20 ? 0 : y;
        // update dataset
        child.dataset.x = x;
        child.dataset.y = y;
        // use style api to update CSS of div
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
        updateChildren(div_parent, secs);
        lt = now;
    }
};
loop();
