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
var updateView = function(flight, document) {
    var plane = document.plane;
    var elements = stationElements(plane);
    for (var i=0; i<elements.length; i++) {
        var id = elements[i];
        document.getElementById(id).value = flight[id];
    }    
};
