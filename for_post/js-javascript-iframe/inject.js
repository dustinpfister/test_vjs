// create and append the iframe
let iFrame = document.createElement('iframe');
document.body.appendChild(iFrame);

// create and inject content into it
let div = document.createElement('div'),
w = iFrame.contentWindow;
div.innerHTML = 'Hello World';
w.document.body.appendChild(div);
