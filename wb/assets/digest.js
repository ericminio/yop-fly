var loadTypes = function(document, types) {
    document.types = types;
};
var loadPlanes = function(document, planes) {
    document.planes = [];
    for (var i=0; i<planes.length; i++) {
        var plane = planes[i]
        var planeoption = document.createElement('option');
        planeoption.id = plane.name;
        planeoption.innerHTML = plane.name;
        document.getElementById('planes').appendChild(planeoption);

        for (var j=0; j<document.types.length; j++) {
            if (document.types[j].id == plane.type) {
                plane.type = document.types[j]; 
                break;                
            }
        }
        document.planes.push(plane);
    }
};
var updateView = function(flight, document) {
    var plane = document.plane;
    var stations = plane.type.stations;
    var updateElement = function(elementId, document, flight) {
        document.getElementById(elementId).value = flight[elementId];
        if (elementId.indexOf('tank') != -1) {
            var gallonsStationId = elementId.replace('tank', 'gallons');
            document.getElementById(gallonsStationId).value = flight[gallonsStationId];
        }
    };
    for (var i=0; i<stations.length; i++) {
        var station = stations[i];
        if (station.count == 1) {
            updateElement(station.id, document, flight);
        }
        else {
            for (var j=1; j<=station.count; j++) {
                updateElement(station.id+'-'+j, document, flight);
            }
        }
    }
};
