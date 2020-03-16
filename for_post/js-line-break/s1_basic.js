var eol = {
    win: '\r\n',
    posix: '\n'
},
os = 'win',

str = 'So this is one line. ' + eol[os] + 'And this is a new one. ' + eol[os];

console.log(str);
