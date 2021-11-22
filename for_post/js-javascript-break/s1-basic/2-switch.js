
let parseElement = function (el) {
    let delta = 0;
    switch (typeof el) {
        case 'string':
            delta = parseFloat(el);
        break;
        case 'number':
            delta = el;
        break;
    }
    delta = String(delta) === 'NaN' ? 0 : delta;
    return delta;
}

let a = [5, NaN, 'b', 7, '5'];
let b = a.map(parseElement);
console.log(b);
// [ 5, 0, 0, 7, 5 ]
