var str = 'This might be the best site on javaScript',
m = str.match(/best site/);

if (m) {
    console.log(str.substr(m.index, str.length - m.index));
    // best site on javaScript
}
