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

var drawLoading = function(document, plane) {
    var diagram = diagramWithId('loading', plane);
    var element = document.getElementById('load');

    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i]
        drawStation(document, element, diagram.ranges, station);
    }
};
var drawWeightAndBalance = function(document, plane) {
    var diagram = diagramWithId('weightAndBalance', plane);
    var element = document.getElementById('envelope');    
    
    drawEnvelope(document, element, diagram.ranges, envelope('utility-category', diagram));
    drawEnvelope(document, element, diagram.ranges, envelope('normal-category', diagram));

    var ramp = convertPointForGraph({ x:plane.totals.moment/1000, y:plane.totals.weight }, diagram.ranges);
    var zerofuel = convertPointForGraph({ x:plane.zerofuel.moment/1000, y:plane.zerofuel.weight }, diagram.ranges);
    drawLine(document, element, ramp, zerofuel, 'actual');

    drawPointOnEnvelope(document, element, ramp, 'actual', 'ramp', 'wb-ramp');
    drawPointOnEnvelope(document, element, zerofuel, 'actual', 'zero fuel', 'wb-zero-fuel');
};
var drawCG = function(document, plane) {
    var diagram = diagramWithId('cg', plane);
    var element = document.getElementById('cg');
    
    drawEnvelope(document, element, diagram.ranges, envelope('utility-category', diagram));
    drawEnvelope(document, element, diagram.ranges, envelope('normal-category', diagram));

    var ramp = convertPointForGraph({ x:plane.totals.moment/plane.totals.weight, y:plane.totals.weight }, diagram.ranges);
    var zerofuel = convertPointForGraph({ x:plane.zerofuel.moment/plane.zerofuel.weight, y:plane.zerofuel.weight }, diagram.ranges);
    drawLine(document, element, ramp, zerofuel, 'actual');

    drawPointOnEnvelope(document, element, ramp, 'actual', 'ramp', 'cg-ramp');
    drawPointOnEnvelope(document, element, zerofuel, 'actual', 'zero fuel', 'cg-zero-fuel');
};

var drawEnvelope = function(document, element, ranges, envelope) {
    var line = '';
    for (var i=0; i<envelope.points.length; i++) {
        var point = convertPointForGraph(envelope.points[i], ranges);
        line += point.x + ',' + point.y + ' ';
    }
    drawPolyline(document, element, line.trim(), envelope.id);
};
var drawPointOnEnvelope = function(document, element, point, className, text, id) {
    drawCircle(document, element, point, {className:className, radius:'2', id:id+'-circle'});
    drawLabel(document, element, point, text, id+'-text');
};
var drawStation = function(document, element, ranges, station) {
    var lineEnd = convertPointForGraph({ x:station.maxWeight*station.arm/1000, y:station.maxWeight }, ranges);
    drawLine(document, element,
        { x:0, y:80 },
        lineEnd,
        'station station-' + station.id
    );
    var center = convertPointForGraph({
        x:station.weight*station.arm/1000,
        y:station.weight,
    }, ranges);
    drawCircle(document, element, center, { id:'loading-'+station.id, className:'station station-' + station.id, radius:'2'});
    drawLabel(document, element, lineEnd, station.id, 'loading-station-' + station.id + '-text');
};
