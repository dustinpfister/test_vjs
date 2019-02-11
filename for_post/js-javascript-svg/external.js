var obj = document.getElementById('svg-external');
obj.addEventListener('load', function () {
    var svg = obj.contentDocument;
    var cir = svg.getElementById('cir');
    cir.setAttributeNS(null, 'r', 75);
});
