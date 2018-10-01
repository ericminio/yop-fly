let childs = [];
let drawLineOnGraph = function(document, graph, p1, p2, color) {
    let line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', ''+p1.x);
    line.setAttribute('y1', ''+p1.y);
    line.setAttribute('x2', ''+p2.x);
    line.setAttribute('y2', ''+p2.y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '1');
    graph.appendChild(line);
    childs.push(line);
};
let drawCircleOnGraph = function(document, graph, center, attributes) {
    let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', '' + center.x);
    circle.setAttribute('cy', '' + center.y);
    circle.setAttribute('r', attributes.radius);
    circle.setAttribute('stroke', attributes.color);
    circle.setAttribute('stroke-width', attributes.strokeWidth);
    circle.setAttribute('fill', 'lightgray');
    graph.appendChild(circle);
    childs.push(circle);
};

let convertPointForLoadGraph = function(point) {
    return {
        x:Math.round(point.x*100/35),
        y:Math.round(100-point.y*100/450)
    };
};
let convertPointForEnvelopeGraph = function(point) {
    return {
        x:Math.round((point.x-45)*100/(130-45)),
        y:Math.round(100-(point.y-1500)*100/(2600-1500))
    };
};
let drawPointOnEnvelopeGraph = function(document, point, color, text) {
    let graph = document.getElementById('envelope');

    drawCircleOnGraph(document, graph, point, {color:color, radius:'1', strokeWidth:'1'});

    let label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.setAttribute('fill', 'black');
    label.setAttribute('x', '' + point.x);
    label.setAttribute('y', '' + point.y);
    label.setAttribute('font-size', '3');
    label.innerHTML = text;
    graph.appendChild(label);
    childs.push(label);
};
let drawContributionOnLoadingGraph = function(document, station) {
    drawLineOnGraph(document, document.getElementById('load'),
        { x:0, y:100 },
        convertPointForLoadGraph({ x:station.max*station.arm/1000, y:station.max }),
        station.color
    );
    let center = convertPointForLoadGraph({
        x:station.weight*station.arm/1000,
        y:station.weight,
    });
    drawCircleOnGraph(document, document.getElementById('load'), center, {color:station.color, radius:'2', strokeWidth:'0.3'});
};
let drawLoadingGraph = function(document, data) {
    drawContributionOnLoadingGraph(document, data.frontSeat);
    drawContributionOnLoadingGraph(document, data.fuel);
    drawContributionOnLoadingGraph(document, data.backSeat);
    drawContributionOnLoadingGraph(document, data.baggage1);
    drawContributionOnLoadingGraph(document, data.baggage2);
};

let drawEnvelope = function(document, envelope) {
    let line = '';
    for (let i=0; i<envelope.points.length; i++) {
        let point = convertPointForEnvelopeGraph(envelope.points[i]);
        line += point.x + ',' + point.y + ' ';
    }
    let graph = document.getElementById('envelope');
    let polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    polyline.setAttribute('points', line);
    polyline.setAttribute('style', 'fill:none;stroke:' + envelope.color + ';stroke-width:1')
    graph.appendChild(polyline);
    childs.push(polyline);
}
let drawEnvelopeGraph = function(document, data) {

    drawEnvelope(document, data.plane.envelopes.utility);
    drawEnvelope(document, data.plane.envelopes.normal);

    let ramp = convertPointForEnvelopeGraph({ x:data.totals.moment/1000, y:data.totals.weight });
    let zerofuel = convertPointForEnvelopeGraph({ x:data.zerofuel.moment/1000, y:data.zerofuel.weight });
    drawLineOnGraph(document, document.getElementById('envelope'), ramp, zerofuel, 'orange');

    drawPointOnEnvelopeGraph(document, ramp, 'orange', 'ramp');
    drawPointOnEnvelopeGraph(document, zerofuel, 'orange', 'zero fuel');
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
let drawGraph = function(document) {
    for (let i=0;i<childs.length;i++) {
        childs[i].remove();
    }
    let data = {
        frontSeat: {
            arm: 37,
            weight: parseInt(document.getElementById('front-seat-left').value) + parseInt(document.getElementById('front-seat-right').value),
            max:400,
            color:'blue'
        },
        backSeat: {
            arm: 73,
            weight: parseInt(document.getElementById('back-seat-left').value) + parseInt(document.getElementById('back-seat-right').value),
            max:400,
            color:'orange'
        },
        fuel: {
            arm: 48,
            weight: parseInt(document.getElementById('fuel').value),
            max:318,
            color:'red'
        },
        baggage1: {
            arm: 95,
            weight: parseInt(document.getElementById('baggage-1').value),
            max:120,
            color:'green'
        },
        baggage2: {
            arm: 123,
            weight: parseInt(document.getElementById('baggage-2').value),
            max:50,
            color:'purple'
        },
        plane: {
            weight: parseInt(document.getElementById('zerofuel-weight').value),
            moment: parseInt(document.getElementById('zerofuel-moment').value),
            envelopes: {
                normal: {
                    color: 'blue',
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
                    color: 'green',
                    points: [
                        { x:52, y:1500 },
                        { x:68, y:1950 },
                        { x:83, y:2200 },
                        { x:89, y:2200 },
                        { x:60.5, y:1500 }
                    ]
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
    drawLoadingGraph(document, data);
    drawEnvelopeGraph(document, data);
};

if (typeof module == 'object') {
    module.exports = {
        drawGraph:drawGraph,
        drawEnvelope:drawEnvelope,
        drawEnvelopeGraph:drawEnvelopeGraph,
        convertPointForEnvelopeGraph:convertPointForEnvelopeGraph
    };
}