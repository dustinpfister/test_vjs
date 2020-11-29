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

var str = 'so Then this is a only a tEst of String Things',
patt = /[A-Z]/g; // pattern to match for Capital letters

// using getIndexValues gives me an array of all pattern matches
var matches = getIndexValues(str, patt);
console.log(matches);
