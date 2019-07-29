// concatenate all paragraphs
document.body.innerHTML = [].map.call(document.querySelectorAll('p'), (el) => {
    return el.innerText;
}).join('<hr>');
