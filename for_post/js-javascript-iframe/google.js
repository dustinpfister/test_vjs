let http = require('https');

http.get('https://www.google.com', (res) => {

    let text = '';
    res.on('data', (chunk) => {

        text += chunk.toString();

    });

    res.on('end', () => {

        console.log(text);

    })

});
