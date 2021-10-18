[].map.call(document.getElementsByTagName('p'), (p) => {
    return p.innerText;
}).reduce((acc, words) => {
    return acc + words + ' ';
}).split(' ').length;