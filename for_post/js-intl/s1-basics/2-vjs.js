//http://www.mredkj.com/javascript/numberFormat.html

var addCommas = function(nStr) {
    nStr += '';                           // convert to string
    x = nStr.split('.');                  // split '1234.56' to ['1234', '56']
    x1 = x[0];                            // '1234' from '1234.56'
    x2 = x.length > 1 ? '.' + x[1] : '';  // '56' from '1234.56'
    var rgx = /(\d+)(\d{3})/;             // regex pattern
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

// works well with some typical examples
console.log( addCommas('1234.56') );       // 1,234.56
console.log( addCommas('1234567890.12') ); // 1,234,567,890.12
// seems to work well up to a point when it comes to large numbers
// in the form of something like 5e20, but as expected there is a limit
console.log( addCommas(5e20) ); // 500,000,000,000,000,000,000
console.log( addCommas(5e21) ); // 5e+21
console.log( addCommas(5.2e20) ); // 520,000,000,000,000,000,000
console.log( addCommas(5.2e21) ); // 5.2e+21