var initialize = function(plane) {
    plane.stations = [];
    for (var i=0; i<plane.type.stations.length; i++) {
        var station = plane.type.stations[i];
        plane.stations.push({
            id: station.id,
            arm:station.arm,
            weight:0,
            maxWeight:station.maxWeight
        });
    }        
};
var station = function(id, plane) {
    for (var i=0; i<plane.stations.length; i++) {
        var candidate = plane.stations[i];
        if (candidate.id == id) {
            return candidate;
        }
    }
};
var injectFlight = function(plane, document) {
    station('frontseat', plane).weight = parseInt(document.getElementById('front-seat-left').value) + parseInt(document.getElementById('front-seat-right').value);
    station('backseat', plane).weight = parseInt(document.getElementById('back-seat-left').value) + parseInt(document.getElementById('back-seat-right').value);
    station('fuel', plane).weight = parseInt(document.getElementById('fuel').value);
    station('baggage1', plane).weight = parseInt(document.getElementById('baggage-1').value);
    station('baggage2', plane).weight = parseInt(document.getElementById('baggage-2').value);
    plane.weight = parseInt(document.getElementById('zerofuel-weight').value);
    plane.moment = parseInt(document.getElementById('zerofuel-moment').value);
};
var childs = [];
var drawGraphs = function(document) {
    for (var i=0;i<childs.length;i++) {
        childs[i].remove();
    }
    var plane = document.plane;
    initialize(plane);
    injectFlight(plane, document);
    computeMoments(plane);    
    computeTotals(plane);
    computeZeroFuel(plane);
    
    drawEnvelopeGraph(document, plane);
    drawLoadingGraph(document, plane);
};
var computeMoment = function(station) {
    station.moment = station.weight * station.arm;
};
var computeMoments = function(plane) {
    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i]
        computeMoment(station);
    }    
};
var computeTotals = function(plane) {
    plane.totals = { weight:plane.weight, moment:plane.moment };    
    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i]
        plane.totals.weight += station.weight;
        plane.totals.moment += station.moment;     
    }
};
var computeZeroFuel = function(plane) {
    plane.zerofuel = { weight:plane.weight, moment:plane.moment };
    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i]
        if (station.id !== 'fuel') {
            plane.zerofuel.weight += station.weight;
            plane.zerofuel.moment += station.moment;
        }
    }
};

var diagram = function(id, plane) {
    var diagrams = plane.type.diagrams;
    for (var i=0; i<diagrams.length; i++) {
        var candidate = diagrams[i];
        if (candidate.id == id) {
            return candidate;
        }
    }
};
var envelope = function(id, diagram) {
    var envelopes = diagram.envelopes;
    for (var i=0; i<envelopes.length; i++) {
        var candidate = envelopes[i];
        if (candidate.id == id) {
            return candidate;
        }
    }
};
var drawEnvelopeGraph = function(document, plane) {
    var wb = diagram('weightAndBalance', plane);
    var graph = { element:document.getElementById('envelope'), ranges:wb.ranges };
    
    drawEnvelope(document, graph, envelope('utility-category', wb));
    drawEnvelope(document, graph, envelope('normal-category', wb));

    var ramp = convertPointForGraph({ x:plane.totals.moment/1000, y:plane.totals.weight }, graph.ranges);
    var zerofuel = convertPointForGraph({ x:plane.zerofuel.moment/1000, y:plane.zerofuel.weight }, graph.ranges);
    drawLineOnGraph(document, graph.element, ramp, zerofuel, 'actual');

    drawPointOnEnvelope(document, graph, ramp, 'actual', 'ramp', 'ramp');
    drawPointOnEnvelope(document, graph, zerofuel, 'actual', 'zero fuel', 'zero-fuel');
};
var drawEnvelope = function(document, graph, envelope) {
    var line = '';
    for (var i=0; i<envelope.points.length; i++) {
        var point = convertPointForGraph(envelope.points[i], graph.ranges);
        line += point.x + ',' + point.y + ' ';
    }
    drawPolylineOnGraph(document, graph.element, line.trim(), envelope.id);
};
var drawPointOnEnvelope = function(document, graph, point, className, text, id) {
    drawCircleOnGraph(document, graph.element, point, {className:className, radius:'2', id:id+'-circle'});
    drawLabelOnGraph(document, graph.element, point, text, id+'-text');
};

var drawLoadingGraph = function(document, plane) {
    var loading = diagram('loading', plane);
    var graph = { element:document.getElementById('load'), ranges:loading.ranges };

    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i]
        drawStation(document, graph, station);
    }
};
var drawStation = function(document, graph, station) {
    drawLineOnGraph(document, graph.element,
        { x:0, y:80 },
        convertPointForGraph({ x:station.maxWeight*station.arm/1000, y:station.maxWeight }, graph.ranges),
        'station station-' + station.id
    );
    var center = convertPointForGraph({
        x:station.weight*station.arm/1000,
        y:station.weight,
    }, graph.ranges);
    drawCircleOnGraph(document, graph.element, center, {className:'station station-' + station.id, radius:'2'});
};

var convertPointForGraph = function(point, ranges) {
    return {
        x:Math.round((point.x-ranges.min.x)*100/(ranges.max.x-ranges.min.x)),
        y:Math.round(80-(point.y-ranges.min.y)*80/(ranges.max.y-ranges.min.y))
    };
};

var drawLineOnGraph = function(document, graph, p1, p2, className) {
    var line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', ''+p1.x);
    line.setAttribute('y1', ''+p1.y);
    line.setAttribute('x2', ''+p2.x);
    line.setAttribute('y2', ''+p2.y);
    line.setAttribute('class', className);
    graph.appendChild(line);
    childs.push(line);
};
var drawCircleOnGraph = function(document, graph, center, attributes) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.id = attributes.id;
    circle.setAttribute('cx', '' + center.x);
    circle.setAttribute('cy', '' + center.y);
    circle.setAttribute('r', attributes.radius);
    circle.setAttribute('class', attributes.className);
    graph.appendChild(circle);
    childs.push(circle);
};
var drawLabelOnGraph = function(document, graph, point, text, id) {
    var label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.id = id;
    label.setAttribute('fill', 'black');
    label.setAttribute('x', '' + point.x);
    label.setAttribute('y', '' + point.y);
    label.setAttribute('font-size', '3');
    label.innerHTML = text;
    graph.appendChild(label);
    childs.push(label);
};
var drawPolylineOnGraph = function(document, graph, points, category) {
    var polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    polyline.setAttribute('points', points);
    polyline.setAttribute('class', category);
    graph.appendChild(polyline);
    childs.push(polyline);
};


if (typeof module == 'object') {
    module.exports = {
        drawGraphs:drawGraphs,
        drawEnvelope:drawEnvelope,
        drawEnvelopeGraph:drawEnvelopeGraph
    };
}
