console.log('loading scripts...');
var base = 'https://cdnjs.cloudflare.com/ajax/libs/';
var libs = [
    'jquery/3.4.1/jquery.js',
    'three.js/106/three.js',
    'axios/0.19.0/axios.js'
];
var loaded = 0;
libs.forEach(function (libPath, i) {
    var scriptTag = document.createElement('script');
    // load in sync order (jquery, three, then axios)
    scriptTag.async = false;
    scriptTag.addEventListener('load', function (e) {
        console.log(e.target.src);
        loaded += 1;
        if (loaded === libs.length) {
            console.log('all loaded');
        }
    });
    scriptTag.src = base + libPath;
    document.body.appendChild(scriptTag);

});
