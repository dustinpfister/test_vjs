console.log('bar script running');
[].forEach.call(document.getElementsByTagName('li'), function (li,i) {
    li.innerText = 'bar ' + i
});
