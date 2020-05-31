var stationElements = function(plane) {
    var elements = [];
    var addElement = function(id) {
        if (id.indexOf('tank') != -1) {
            elements.push(id.replace('tank', 'gallons'));
        }
        elements.push(id);
    }
    var stations = plane.type.stations;
    for (var i=0; i<stations.length; i++) {
        var station = stations[i];
        if (station.count == 1) {
            addElement(station.id);
        }
        else {
            for (var j=1; j<=station.count; j++) {
                addElement(station.id+'-'+j);
            }
        }
    }
    return elements;
}

var selectPlaneIndex = function(document, name) {
    for (var i = 0; i < document.planes.length; i++) {
        if (document.planes[i].name == name) {
            return i;
        }
    }
    return undefined;
}
var selectPlane = function(document, name) {
    var planeIndex = selectPlaneIndex(document, name);
    var plane = document.planes[planeIndex?planeIndex:0];
    document.plane = plane;
    document.getElementById('zerofuel-weight').value = plane.weight
    document.getElementById('zerofuel-moment').value = plane.moment
    updatePlaneArm(document);
    updateStationsForm(document);
    if (document.flight) {
        updateView(document.flight, document);
    }
};
var updatePlaneArm = function(document) {
    var moment = parseFloat(document.getElementById('zerofuel-moment').value)
    var weight = parseFloat(document.getElementById('zerofuel-weight').value)
    var arm = (moment / weight).toFixed(3);
    document.getElementById('zerofuel-arm').innerHTML = '(arm:' + arm + 'in)';
};
var injectFlight = function(document, plane) {
    plane.weight = parseFloat(document.getElementById('zerofuel-weight').value);
    plane.moment = parseFloat(document.getElementById('zerofuel-moment').value);
    var stations = plane.stations;
    for (var i=0; i<stations.length; i++) {
        var station = stations[i];
        if (station.count == 1) {
            station.weight = parseFloat(document.getElementById(station.id).value);
        }
        else {
            station.weight = 0;
            for (var j=1; j<=station.count; j++) {
                station.weight += parseFloat(document.getElementById(station.id+'-'+j).value);                    
            }
        }
    }
};
var onUpdate = function(field, document) {
    if (field.id.indexOf('gallons') != -1) {
        var gallons = parseFloat(document.getElementById(field.id).value);
        document.getElementById(field.id.replace('gallons', 'tank')).value = gallons * 6;
    }
    updateFlight(document);
};
var updateFlight = function(document) {
    var plane = document.plane;
    
    initializeStations(plane);
    injectFlight(document, plane);
    updateFlightLink(document);

    computeMoments(plane);    
    computeTotals(plane);
    computeZeroFuel(plane);
    document.getElementById('total-weight').innerHTML = 'Ramp weight: ' + plane.totals.weight.toFixed(2) + ' lbs';    
    drawGraphs(document);
};
updateFlightLink = function(document) {
    var flight = { plane: document.plane.name };
    var elements = stationElements(document.plane);
    for (var i=0; i<elements.length; i++) {
        var id = elements[i];
        flight[id] = document.getElementById(id).value;
    }    
    document.flight = flight;
    var encoded = encodeFlight(flight, window);
    var url = window.location.pathname + '?flight=' + encoded;
    var link = document.getElementById('flight-link');
    link.href = url;
    link.innerHTML = encoded.substring(0, 7) + '...';
};
var updateStationsForm = function(document) {
    var form = '';
    var addInputField = function(id) {
        if (id.indexOf('tank') != -1) {
            return `
                <label>${id}</label>
                <br/>
                <input id="${id.replace('tank', 'gallons')}" value="0" oninput="onUpdate(this, document);" />
                    &nbsp;gal&nbsp;=&nbsp;
                <input id="${id}" value="0" disabled/> lbs
                <br/>
            `;
        }
        else {
            return `
                <label>${id}</label>
                <br/>
                <input id="${id}" value="0" oninput="onUpdate(this, document);" /> lbs
                <br/>
            `;
        }
    };
    var plane = document.plane;
    var stations = plane.type.stations;    
    for (var i=0; i<stations.length; i++) {
        var station = stations[i];
        if (station.count == 1) {
            form += addInputField(station.id);
        }
        else {
            for (var j=1; j<=station.count; j++) {
                form += addInputField(station.id+'-'+j);
            }
        }
    }

    document.getElementById('stations').innerHTML = form;
};