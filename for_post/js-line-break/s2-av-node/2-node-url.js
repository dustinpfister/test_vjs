
const eol = {
    win: decodeURIComponent('%0D%0A'),
    posix: decodeURIComponent('%0A')
}

console.log(Buffer.from(eol.win).toString('hex')); // 0d0a
