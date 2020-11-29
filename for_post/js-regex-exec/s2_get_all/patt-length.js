var getIndexValues = function (str, regex) {
    var patt = new RegExp(regex), // creating a new regEx Object from the given one
    match, // to hold a current match result
    matchArray = []; // the array of matches
    if (patt.global) {
        while (match = patt.exec(str)) {
            matchArray.push({
                text: match[0],
                index: match.index,
                endIndex: match.index + match[0].length
            });
        }
    } else {
        match = patt.exec(str);
        if (match) {
            matchArray.push(match);
        }
    }
    return matchArray;
};

var str = 'If a=400, a2=10, and b=a*a2 then b=4000',
patt = /\S+=\d+/g;

var matches = getIndexValues(str, patt);
console.log(matches);
/*
[{
        text: 'a=400',
        index: 3,
        endIndex: 8
    }, {
        text: 'a2=10',
        index: 10,
        endIndex: 15
    }, {
        text: 'b=4000',
        index: 33,
        endIndex: 39
    }
]
*/
