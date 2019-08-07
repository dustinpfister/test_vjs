let weight = function(text, keyword){

    let w = 0,
    i = 2,
    len = arguments.length;
    while (i < len) {

        w += arguments[i](text, keyword);

        //console.log(arguments[i]);

        i += 1;
    }

    return w;

};

let totalMatch = (text, keyword) => {
    let w = 0,
    m = text.match(new RegExp(keyword, 'g'));
    if (m) {
        w = m.length * 100;
    }
    return w;
};

let text = 'This is some text about fuzzy cats in action';

let w1 = weight(
        text,
        'fuzzy cats',
        totalMatch);

console.log(w1);
