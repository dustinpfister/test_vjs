var mess = function (happy) {
    if (!happy) {
        return 'I am Not Happy'
    }
    return 'I am Happy';
};

console.log(mess()); // 'I am NOT Happy'
console.log(mess(false)); // 'I am NOT Happy'
console.log(mess(true)); // 'I am Happy'
