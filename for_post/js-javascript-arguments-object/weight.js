let weight = function (text, keyword) {
    let w = 0,
    i = 2,
    len = arguments.length;
    while (i < len) {
        w += arguments[i](text, keyword);
        i += 1;
    }
    return w;

};

// 100 point for each total match
let totalMatch = (text, keyword) => {
    let w = 0,
    m = text.match(new RegExp(keyword, 'g'));
    if (m) {
        w = m.length * 100;
    }
    return w;
};

// 25 points for each word
let keywords = (text, keyword) => {
    let w = 0,
    kwArr = keyword.split(' ')
        text.split(' ').forEach((tw) => {
            kwArr.forEach((kw) => {
                w += kw === tw ? 25 : 0;
            });
        });
    return w;
};

// 1 point for each word
let wordCount = (text, keyword) => {
    return text.split(' ').length;
};

let text = 'this is some text about fuzzy cats in action becuase cats are cool';

let w1 = weight(
        text,
        'fuzzy cats',
        totalMatch,
        keywords,
        wordCount);

console.log(w1);
