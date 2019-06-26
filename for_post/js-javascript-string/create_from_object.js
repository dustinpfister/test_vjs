let obj = {
    intro: 'Hello, ',
    mess: 'This is Dustin. ',
    end: 'Have a nice day'
};

// Object.keys, Array.map, and Array.join
let str = Object.keys(obj).map((key) => {
        return obj[key];
    }).join('');
console.log(str);
// Hello, This is Dustin. Have a nice day

// for in
let str2 = '';
for (let prop in obj) {
    str2 += obj[prop];
}
console.log(str2);
// Hello, This is Dustin. Have a nice day
