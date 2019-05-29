console.log('loading scripts...');
var scripts = ['foo.js', 'bar.js'],
i = 0,
loadNext = function () {
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

