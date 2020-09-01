var t = setInterval(function () {
        console.log('tick');
    }, 250);

setTimeout(function () {
    clearInterval(t);
}, 3000);
