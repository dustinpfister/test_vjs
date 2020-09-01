var t = setInterval(function () {
        console.log('tick');
    }, 250);

setTimeout(function () {
    clearTimeout(t);
}, 3000);
