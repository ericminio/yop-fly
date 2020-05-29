var drawLine = function(document, element, p1, p2, className) {
    var line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', ''+p1.x);
    line.setAttribute('y1', ''+p1.y);
    line.setAttribute('x2', ''+p2.x);
    line.setAttribute('y2', ''+p2.y);
    line.setAttribute('class', className);
    element.appendChild(line);
    childs.push(line);
};
var drawCircle = function(document, element, center, attributes) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.id = attributes.id;
    circle.setAttribute('cx', '' + center.x);
    circle.setAttribute('cy', '' + center.y);
    circle.setAttribute('r', attributes.radius);
    circle.setAttribute('class', attributes.className);
    element.appendChild(circle);
    childs.push(circle);
};
var drawLabel = function(document, element, point, text, id) {
    var label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.id = id;
    label.setAttribute('fill', 'black');
    label.setAttribute('x', '' + point.x);
    label.setAttribute('y', '' + point.y);
    label.setAttribute('font-size', '3');
    label.innerHTML = text;
    element.appendChild(label);
    childs.push(label);
};
var drawPolyline = function(document, element, points, category) {
    var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    polyline.setAttribute('points', points);
    polyline.setAttribute('class', category);
    element.appendChild(polyline);
    childs.push(polyline);
};
