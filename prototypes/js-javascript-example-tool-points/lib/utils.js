var utils = {};

//-------- ----------
//  DOM
//-------- ----------

utils.removeAllChildNodes = function(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

//-------- ----------
//  Object
//-------- ----------

// parse json in a pretty way
// https://stackoverflow.com/questions/6937863/json-stringify-so-that-arrays-are-on-one-line
utils.jsonPretty = (function(){
    // built in replacer
    var replacer = function(k, v){
        if(v instanceof Array){
            if(typeof v[0] === 'number'){
                return JSON.stringify(v);
            }
        }
        return v;
    };
    // public jsonPretty function
    return function(obj){
        return JSON.stringify(obj, replacer, 2)
        .replace(/\\/g, '')
        .replace(/\"\[/g, '[')
        .replace(/\]\"/g,']')
        .replace(/\"\{/g, '{')
        .replace(/\}\"/g,'}');
    };
}());

// parse an object with defaults
utils.defaults = function(obj, defaults){
    return Object.assign({}, defaults, obj);
};
