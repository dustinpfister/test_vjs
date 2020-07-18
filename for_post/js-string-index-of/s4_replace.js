let getIndexValues = (source, pattern) => {
    let matches = [],
    i = 0;
    source.replace(pattern, (match, offset) => {
        matches.push({
            match: match,
            offset: offset,
            index: i
        });
        i += 1;
    });
    return matches;
};

var ex = getIndexValues('foo bar 42 40 bar chew', /bar/g);

console.log(ex);
// [ { match: 'bar', offset: 4, index: 0 }, { match: 'bar', offset: 14, index: 1 } ]
