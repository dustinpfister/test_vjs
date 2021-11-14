var get = function (id) {
    return document.getElementById(id);
};

var el = {
    x: get('x'),
    y: get('y'),
    set: get('set'),
    out: get('out'),
    con: get('container')
};

var add = function (id, eventName, cb) {
    el[id].addEventListener(eventName, cb);
}

var onTextBlur = function (e) {
    el.out.innerText = '';
};

var onTextFocus = function (mess) {
    return function (e) {
        el.out.innerText = mess;
    };
};

add('x', 'blur', onTextBlur);
add('y', 'blur', onTextBlur);

add('x', 'focus', onTextFocus('set the value of x'));
add('y', 'focus', onTextFocus('set the value of y'));
