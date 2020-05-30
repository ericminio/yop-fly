var childs = [];
var drawGraphs = function(document) {
    for (var i=0;i<childs.length;i++) {
        childs[i].remove();
    }
    var plane = document.plane;
    drawWeightAndBalance(document, plane);
    drawLoading(document, plane);
    drawCG(document, plane);
};

var convertPointForGraph = function(point, ranges) {
    return {
        x:Math.round((point.x-ranges.min.x)*100/(ranges.max.x-ranges.min.x)),
        y:Math.round(80-(point.y-ranges.min.y)*80/(ranges.max.y-ranges.min.y))
    };
};

var drawWeightAndBalance = function(document, plane) {
    var wb = diagram('weightAndBalance', plane);
    var graph = { element:document.getElementById('envelope'), ranges:wb.ranges };
    
    drawEnvelope(document, graph, envelope('utility-category', wb));
    drawEnvelope(document, graph, envelope('normal-category', wb));

    var ramp = convertPointForGraph({ x:plane.totals.moment/1000, y:plane.totals.weight }, graph.ranges);
    var zerofuel = convertPointForGraph({ x:plane.zerofuel.moment/1000, y:plane.zerofuel.weight }, graph.ranges);
    drawLine(document, graph.element, ramp, zerofuel, 'actual');

    drawPointOnEnvelope(document, graph, ramp, 'actual', 'ramp', 'wb-ramp');
    drawPointOnEnvelope(document, graph, zerofuel, 'actual', 'zero fuel', 'wb-zero-fuel');
};
var drawEnvelope = function(document, graph, envelope) {
    var line = '';
    for (var i=0; i<envelope.points.length; i++) {
        var point = convertPointForGraph(envelope.points[i], graph.ranges);
        line += point.x + ',' + point.y + ' ';
    }
    drawPolyline(document, graph.element, line.trim(), envelope.id);
};
var drawPointOnEnvelope = function(document, graph, point, className, text, id) {
    drawCircle(document, graph.element, point, {className:className, radius:'2', id:id+'-circle'});
    drawLabel(document, graph.element, point, text, id+'-text');
};

var drawLoading = function(document, plane) {
    var loading = diagram('loading', plane);
    var graph = { element:document.getElementById('load'), ranges:loading.ranges };

    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i]
        drawStation(document, graph, station);
    }
};
var drawStation = function(document, graph, station) {
    var lineEnd = convertPointForGraph({ x:station.maxWeight*station.arm/1000, y:station.maxWeight }, graph.ranges);
    drawLine(document, graph.element,
        { x:0, y:80 },
        lineEnd,
        'station station-' + station.id
    );
    var center = convertPointForGraph({
        x:station.weight*station.arm/1000,
        y:station.weight,
    }, graph.ranges);
    drawCircle(document, graph.element, center, { id:'loading-'+station.id, className:'station station-' + station.id, radius:'2'});
    drawLabel(document, graph.element, lineEnd, station.id, 'loading-station-' + station.id + '-text');
};
var drawCG = function(document, plane) {
    var cg = diagram('cg', plane);
    var graph = { element:document.getElementById('cg'), ranges:cg.ranges };
    
    drawEnvelope(document, graph, envelope('utility-category', cg));
    drawEnvelope(document, graph, envelope('normal-category', cg));

    var ramp = convertPointForGraph({ x:plane.totals.moment/plane.totals.weight, y:plane.totals.weight }, graph.ranges);
    var zerofuel = convertPointForGraph({ x:plane.zerofuel.moment/plane.zerofuel.weight, y:plane.zerofuel.weight }, graph.ranges);
    drawLine(document, graph.element, ramp, zerofuel, 'actual');

    drawPointOnEnvelope(document, graph, ramp, 'actual', 'ramp', 'cg-ramp');
    drawPointOnEnvelope(document, graph, zerofuel, 'actual', 'zero fuel', 'cg-zero-fuel');
};
