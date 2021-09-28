#!/usr/bin/node

/*
 *    $ node file-shebang
 *    10.24.0
 *
 *    $ ./file-shebang.js
 *     bash: ./file-shebang.js: Permission denied
 *
 *    $ sudo chmod 777 file-shebang.js
 *    $ ./file-shebang.js
 *    10.24.0
 */

console.log(process.version);