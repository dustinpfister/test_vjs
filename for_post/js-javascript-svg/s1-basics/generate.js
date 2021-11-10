var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttributeNS(null, 'width', 320);
svg.setAttributeNS(null, 'height', 240);

var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circle.setAttributeNS(null, 'cx', 160);
circle.setAttributeNS(null, 'cy', 120);
circle.setAttributeNS(null, 'r', 75);
circle.setAttributeNS(null, 'fill', 'green');
svg.appendChild(circle);

document.body.appendChild(svg);