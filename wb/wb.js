let childs = [];
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
let drawLineOnLoadingGraph = function(document, point) {
    let graph = document.getElementById('load');
    let line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', '100');
    line.setAttribute('x2', ''+convertPointForLoadGraph(point).x);
    line.setAttribute('y2', ''+convertPointForLoadGraph(point).y);
    line.setAttribute('stroke', point.color);
    line.setAttribute('stroke-width', '1');
    graph.appendChild(line);
    childs.push(line);
};
let drawLineOnEnvelopeGraph = function(document, p1, p2, color) {
    let graph = document.getElementById('envelope');
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
let drawCircleOnLoadingGraph = function(document, load) {
    let graph = document.getElementById('load');
    let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    let center = {
        x:load.weight*load.arm/1000,
        y:load.weight,
    }
    circle.setAttribute('cx', '' + convertPointForLoadGraph(center).x);
    circle.setAttribute('cy', '' + convertPointForLoadGraph(center).y);
    circle.setAttribute('r', '2');
    circle.setAttribute('stroke', load.color);
    circle.setAttribute('stroke-width', '0.3');
    circle.setAttribute('fill', 'lightgray');
    graph.appendChild(circle);
    childs.push(circle);
};
let drawContributionOnLoadingGraph = function(document, contribution) {
    drawLineOnLoadingGraph(document, { x:contribution.max*contribution.arm/1000, y:contribution.max, color:contribution.color });
    drawCircleOnLoadingGraph(document, contribution);
};
let drawLoadingGraph = function(document, data) {
    drawContributionOnLoadingGraph(document, data.frontSeat);
    drawContributionOnLoadingGraph(document, data.fuel);
    drawContributionOnLoadingGraph(document, data.backSeat);
    drawContributionOnLoadingGraph(document, data.baggage1);
    drawContributionOnLoadingGraph(document, data.baggage2);
};

let drawEnvelope = function(document, points, color) {
    let line = '';
    for (let i=0; i<points.length; i++) {
        line += points[i].x + ',' + points[i].y + ' ';
    }
    let graph = document.getElementById('envelope');
    let polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    polyline.setAttribute('points', line);
    polyline.setAttribute('style', 'fill:none;stroke:' + color + ';stroke-width:1')
    graph.appendChild(polyline);
    childs.push(polyline);
}
let drawPointOnEnvelopeGraph = function(document, point, color, text) {
    let graph = document.getElementById('envelope');

    let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', '' + point.x);
    circle.setAttribute('cy', '' + point.y);
    circle.setAttribute('r', '1');
    circle.setAttribute('stroke', color);
    circle.setAttribute('stroke-width', '1');
    circle.setAttribute('fill', 'lightgray');
    graph.appendChild(circle);
    childs.push(circle);

    let label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.setAttribute('fill', 'black');
    label.setAttribute('x', '' + point.x);
    label.setAttribute('y', '' + point.y);
    label.setAttribute('font-size', '3');
    label.innerHTML = text;
    graph.appendChild(label);
    childs.push(label);
}
let drawEnvelopeGraph = function(document, data) {
    let points = [];
    points.push(convertPointForEnvelopeGraph({ x:52, y:1500 }));
    points.push(convertPointForEnvelopeGraph({ x:68, y:1950 }));
    points.push(convertPointForEnvelopeGraph({ x:83, y:2200 }));
    points.push(convertPointForEnvelopeGraph({ x:89, y:2200 }));
    points.push(convertPointForEnvelopeGraph({ x:60.5, y:1500 }));
    drawEnvelope(document, points, 'green');

    points = [];
    points.push(convertPointForEnvelopeGraph({ x:52, y:1500 }));
    points.push(convertPointForEnvelopeGraph({ x:68, y:1950 }));
    points.push(convertPointForEnvelopeGraph({ x:83, y:2200 }));
    points.push(convertPointForEnvelopeGraph({ x:104.5, y:2550 }));
    points.push(convertPointForEnvelopeGraph({ x:121, y:2550 }));
    points.push(convertPointForEnvelopeGraph({ x:70.5, y:1500 }));
    drawEnvelope(document, points, 'blue');

    let ramp = convertPointForEnvelopeGraph({ x:data.totals.moment/1000, y:data.totals.weight });
    let zerofuel = convertPointForEnvelopeGraph({ x:data.zerofuel.moment/1000, y:data.zerofuel.weight });
    drawLineOnEnvelopeGraph(document, ramp, zerofuel, 'orange');

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
            moment: parseInt(document.getElementById('zerofuel-moment').value)
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
        convertPointForEnvelopeGraph:convertPointForEnvelopeGraph
    };
}
