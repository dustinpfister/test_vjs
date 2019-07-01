var Reporter = function (opt) {

    opt = opt || {};

    var canvas = document.createElement('canvas'),
    container = document.createElement('div'),
    appendTo = opt.appendTo || document.body;

    var input_x = document.createElement('input');

    // append
    appendTo.appendChild(container);

    input_x.addEventListener('change', function (e) {

        console.log('input change');
        console.log(e.target.value);

    });

    input_x.addEventListener('focus', function (e) {

        console.log('focus');
        console.log(e);

    });

    input_x.addEventListener('blur', function () {

        console.log('blur');
        console.log(e);

    });

};
