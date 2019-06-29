var el = document.getElementById('out'),
arr = [1,2,3,4];
html = '<ul>';
arr.forEach(function(n){
html += '<li>'+n+'</li>'
});
el.innerHTML = html += '<\/ul>';