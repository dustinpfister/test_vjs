let path = require('path'),
report = require(path.join(__dirname, 'report.js'));

report(path.join(__dirname, 'posts'), path.join(__dirname, 'report.json'))
.then((a) => {
    console.log('report done');
})
.catch((e) => {
    console.warn(e.message);
});
