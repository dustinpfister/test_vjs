let isValueNaN = (a) => {
    if (typeof a != 'number') {
        return false;
    }
    if (String(a) === 'NaN') {
        return true;
    }
    return false;
};

var _isNaN = function(val) {

  // not a number? than false.
  if (typeof val !== 'number') {
    return false;
  }

  // convert to String and test against the String 'NaN'
  return val + '' === 'NaN';

};

var _isNaN = function(n) {
    return isNumber(n) && n != +n;
}


Number.isNaN = Number.isNaN || function(n){

   return isNumber(n) && n != +n;

};