var getIndexValues = function (str, regex) {
    var patt = new RegExp(regex), // creating a new regEx Object from the given one
    match,  // to hold a current match result
    matchArray = []; // the array of matches
    if (patt.global) {
        while (match = patt.exec(str)) {
            matchArray.push(match);
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
/*
[
    ['T', index: 3, input: 'so Then this is a only a tEst of String Things'], 
    ['E', index: 26, input: 'so Then this is a only a tEst of String Things'], 
    ['S', index: 33, input: 'so Then this is a only a tEst of String Things'], 
    ['T', index: 40, input: 'so Then this is a only a tEst of String Things']
];
*/


/*
var formated = function (str, regex) {
    return getIndexValues(str, regex).map(function (m) {
        return m + m.index;
    }).join(',')
}

var str = 'so Then this is a only a tEst of String Things';

console.log(formated(str, /[A-Z]/));
// T3
console.log(formated(str, /[A-Z]/g));
// T3,E26,S33,T40
*/

