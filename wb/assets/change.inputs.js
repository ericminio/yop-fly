var selectPlane = function(document, name) {
    var plane;
    for (var i = 0; i < document.planes.length; i++) {
        if (document.planes[i].name == name) {
            plane = document.planes[i];
        }
    }
    document.plane = plane;
    document.getElementById('zerofuel-weight').value = plane.weight
    document.getElementById('zerofuel-moment').value = plane.moment
    updatePlaneArm(document);
};
var updatePlaneArm = function(document) {
    var moment = parseFloat(document.getElementById('zerofuel-moment').value)
    var weight = parseFloat(document.getElementById('zerofuel-weight').value)
    var arm = (moment / weight).toFixed(3);
    document.getElementById('zerofuel-arm').innerHTML = '(arm:' + arm + 'in)';
};
var updateFlight = function(document) {
    var plane = document.plane;
    
    initializeStations(plane);
    plane.type.injectFlight(document, plane);
    computeMoments(plane);    
    computeTotals(plane);
    computeZeroFuel(plane);
    document.getElementById('total-weight').innerHTML = 'Ramp weight: ' + plane.totals.weight.toFixed(2) + ' lbs';    
    drawGraphs(document);
};
