#!/usr/bin/node

/*
 * $ echo "[1,2,3]" | node process-stdin-stdout.js
 * [2,4,8]
 *
 */

let os = require('os');

// on standard input
process.stdin.on('data', (data) => {
    let str = data.toString(),
    sourceArr = [],
    arr = [];
    try{
        sourceArr = JSON.parse(str) 
    }catch(e){
        process.stderr.write(e.message);
    }
    arr = sourceArr.map((n) => {
        return Math.pow(2, parseInt(n));
    });
    process.stdout.write(JSON.stringify(arr) + os.EOL);
});