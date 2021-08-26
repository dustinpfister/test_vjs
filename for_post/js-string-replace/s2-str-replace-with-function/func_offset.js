let replacer = (match, offset, str) => {
    return offset;
};
let str = 'This string injectOffset where an offset value will be injected injectOffset each time';
console.log( str.replace(/injectOffset/g, replacer) );
// This string 12 where an offset value will be injected 64 each time
