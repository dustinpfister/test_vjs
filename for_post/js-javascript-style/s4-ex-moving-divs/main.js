var createChildren = function (div) {
    var i = 10;
    while (i--) {
        var child = document.createElement('div');
        child.className = '.div_child';
        child.id = 'child_' + i;
        div.appendChild(child);
    }
};

var div_parent = document.querySelector('.div_parent');
