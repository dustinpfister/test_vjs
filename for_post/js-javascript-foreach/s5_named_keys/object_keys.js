let obj = {
    foo: 1,
    man: 2,
    chew: 3
};

let str = Object.keys(obj).map((key) => {
        return key + obj[key];
    }).join('-');

console.log(str); // 'foo1-man2-chew3'
