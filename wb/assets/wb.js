let childs = [];
var drawGraphs = function(document) {
    for (let i=0;i<childs.length;i++) {
        childs[i].remove();
    }
    let data = {
        frontSeat: {
            arm: 37,
            weight: parseInt(document.getElementById('front-seat-left').value) + parseInt(document.getElementById('front-seat-right').value),
            max:400,
            css:'station station-frontseat'
        },
        backSeat: {
            arm: 73,
            weight: parseInt(document.getElementById('back-seat-left').value) + parseInt(document.getElementById('back-seat-right').value),
            max:400,
            css:'station station-backseat'
        },
        fuel: {
            arm: 48,
            weight: parseInt(document.getElementById('fuel').value),
            max:318,
            css:'station station-fuel'
        },
        baggage1: {
            arm: 95,
            weight: parseInt(document.getElementById('baggage-1').value),
            max:120,
            css:'station station-baggage1'
        },
        baggage2: {
            arm: 123,
            weight: parseInt(document.getElementById('baggage-2').value),
            max:50,
            css:'station station-baggage2'
        },
        plane: {
            weight: parseInt(document.getElementById('zerofuel-weight').value),
            moment: parseInt(document.getElementById('zerofuel-moment').value),
            envelopes: {
                ranges: {
                    min: { x:45, y:1500 },
                    max: { x:130, y:2600 }
                },
                actual: {
                    css: 'actual'
                },
                normal: {
                    css: 'normal-category',
                    points: [
                        { x:52, y:1500 },
                        { x:68, y:1950 },
                        { x:83, y:2200 },
                        { x:104.5, y:2550 },
                        { x:121, y:2550 },
                        { x:70.5, y:1500 }
                    ]
                },
                utility: {
                    css: 'utility-category',
                    points: [
                        { x:52, y:1500 },
                        { x:68, y:1950 },
                        { x:83, y:2200 },
                        { x:89, y:2200 },
                        { x:60.5, y:1500 }
                    ]
                }
            },
            loading: {
                ranges: {
                    min: { x:0, y:0 },
                    max: { x:35, y:450 }
                }
            }
        },
        totals: {

        },
        zerofuel: {

        }
    };
    computeMoments(data);
    computeTotals(data);
    computeZeroFuel(data);
    drawEnvelopeGraph(document, data);
    drawLoadingGraph(document, data);
};
let computeMoment = function(data, field) {
    data[field].moment = data[field].weight * data[field].arm;
};
let computeMoments = function(data) {
    computeMoment(data, 'frontSeat');
    computeMoment(data, 'backSeat');
    computeMoment(data, 'fuel');
    computeMoment(data, 'baggage1');
    computeMoment(data, 'baggage2');
};
let computeTotals = function(data) {
    data.totals.weight = data.plane.weight + data.frontSeat.weight + data.backSeat.weight + data.fuel.weight + data.baggage1.weight + data.baggage2.weight;
    data.totals.moment = data.plane.moment + data.frontSeat.moment + data.backSeat.moment + data.fuel.moment + data.baggage1.moment + data.baggage2.moment;
};
let computeZeroFuel = function(data) {
    data.zerofuel.weight = data.plane.weight + data.frontSeat.weight + data.backSeat.weight + data.baggage1.weight + data.baggage2.weight;
    data.zerofuel.moment = data.plane.moment + data.frontSeat.moment + data.backSeat.moment + data.baggage1.moment + data.baggage2.moment;
};

let drawEnvelopeGraph = function(document, data) {
    let graph = { element:document.getElementById('envelope'), ranges:data.plane.envelopes.ranges };

    drawEnvelope(document, graph, data.plane.envelopes.utility);
    drawEnvelope(document, graph, data.plane.envelopes.normal);

    let ramp = convertPointForGraph({ x:data.totals.moment/1000, y:data.totals.weight }, graph.ranges);
    let zerofuel = convertPointForGraph({ x:data.zerofuel.moment/1000, y:data.zerofuel.weight }, graph.ranges);
    drawLineOnGraph(document, graph.element, ramp, zerofuel, data.plane.envelopes.actual.css);

    drawPointOnEnvelope(document, graph, ramp, data.plane.envelopes.actual.css, 'ramp', 'ramp');
    drawPointOnEnvelope(document, graph, zerofuel, data.plane.envelopes.actual.css, 'zero fuel', 'zero-fuel');
};
let drawEnvelope = function(document, graph, envelope) {
    let line = '';
    for (let i=0; i<envelope.points.length; i++) {
        let point = convertPointForGraph(envelope.points[i], graph.ranges);
        line += point.x + ',' + point.y + ' ';
    }
    drawPolylineOnGraph(document, graph.element, line.trim(), envelope.css);
};
let drawPointOnEnvelope = function(document, graph, point, className, text, id) {
    drawCircleOnGraph(document, graph.element, point, {className:className, radius:'2', id:id+'-circle'});
    drawLabelOnGraph(document, graph.element, point, text, id+'-text');
};

let drawLoadingGraph = function(document, data) {
    let graph = { element:document.getElementById('load'), ranges:data.plane.loading.ranges };

    drawStation(document, graph, data.frontSeat);
    drawStation(document, graph, data.fuel);
    drawStation(document, graph, data.backSeat);
    drawStation(document, graph, data.baggage1);
    drawStation(document, graph, data.baggage2);
};
let drawStation = function(document, graph, station) {
    drawLineOnGraph(document, graph.element,
        { x:0, y:80 },
        convertPointForGraph({ x:station.max*station.arm/1000, y:station.max }, graph.ranges),
        station.css
    );
    let center = convertPointForGraph({
        x:station.weight*station.arm/1000,
        y:station.weight,
    }, graph.ranges);
    drawCircleOnGraph(document, graph.element, center, {className:station.css, radius:'2'});
};

let convertPointForGraph = function(point, ranges) {
    return {
        x:Math.round((point.x-ranges.min.x)*100/(ranges.max.x-ranges.min.x)),
        y:Math.round(80-(point.y-ranges.min.y)*80/(ranges.max.y-ranges.min.y))
    };
};

let drawLineOnGraph = function(document, graph, p1, p2, className) {
    let line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', ''+p1.x);
    line.setAttribute('y1', ''+p1.y);
    line.setAttribute('x2', ''+p2.x);
    line.setAttribute('y2', ''+p2.y);
    line.setAttribute('class', className);
    graph.appendChild(line);
    childs.push(line);
};
let drawCircleOnGraph = function(document, graph, center, attributes) {
    let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.id = attributes.id;
    circle.setAttribute('cx', '' + center.x);
    circle.setAttribute('cy', '' + center.y);
    circle.setAttribute('r', attributes.radius);
    circle.setAttribute('class', attributes.className);
    graph.appendChild(circle);
    childs.push(circle);
};
let drawLabelOnGraph = function(document, graph, point, text, id) {
    let label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.id = id;
    label.setAttribute('fill', 'black');
    label.setAttribute('x', '' + point.x);
    label.setAttribute('y', '' + point.y);
    label.setAttribute('font-size', '3');
    label.innerHTML = text;
    graph.appendChild(label);
    childs.push(label);
};
let drawPolylineOnGraph = function(document, graph, points, category) {
    let polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
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
