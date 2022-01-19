var utils = {};

//-------- ----------
//  DOM
//-------- ----------

utils.removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};