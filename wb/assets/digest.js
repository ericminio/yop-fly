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
    var elements = stationElements(plane);
    for (var i=0; i<elements.length; i++) {
        var id = elements[i];
        document.getElementById(id).value = flight[id];
    }    
};
