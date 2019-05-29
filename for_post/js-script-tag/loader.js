var scripts = ['foo.js', 'bar.js'];

console.log('loading scripts...');

var i = 0;
var loadNext = function () {
    var scriptTag = document.createElement('script');
    scriptTag.src = scripts[i];
    scriptTag.addEventListener('load', function () {
        i += 1;
        if (i < scripts.length) {
            loadNext();
        } else {
            console.log('scripts loaded');
        }
    })
    document.body.appendChild(scriptTag);
};

loadNext();

//});
