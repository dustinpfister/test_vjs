var eol = {
    win: '\u000d\u000a',
    posix: '\u000a'
},
os = 'win',

str = 'So this is one line. ' + eol[os] + 'And this is a new one. ' + eol[os];

console.log(str);
