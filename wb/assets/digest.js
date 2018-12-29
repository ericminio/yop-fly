var loadPlanes = function(document, planes) {
    for (var i=0; i<planes.length; i++) {
        var plane = document.createElement('option');
        plane.id = planes[i].name;
        plane.innerHTML = planes[i].name;
        document.getElementById('planes').appendChild(plane);
    }
};
