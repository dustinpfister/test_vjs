// the expression I would out is like this
console.log(80192 - 80192 / 31 * 13); // 46563.096774193546

// grouping like this is not necessary but might help
// make what is going on more clear
console.log(80192 - ((80192 / 31) * 13)); // 46563.096774193546

// now to replace the literals with variables
let dataCap = 80192,
daysInMonth = 31,
currentDayOfMonth = 13;

console.log(dataCap - ((dataCap / daysInMonth) * currentDayOfMonth)); // 46563.096774193546

// And now I can make a method
let getDataCap = (dataCap, now) => {

    // assume 8GB and todays date if nothing
    // is given
    dataCap = dataCap || 1024 * 8;
    now = now || new Date();

    // get number of days, and day of month, from the given now date object.
    let daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate(),
    currentDayOfMonth = now.getDate();

    // return the result with the expression I worked out with a knowledge
    // of operator precedence in javaScript
    return dataCap - ((dataCap / daysInMonth) * currentDayOfMonth);

};

console.log( getDataCap(80192,new Date(2019,7,13)) ); // 46563.096774193546