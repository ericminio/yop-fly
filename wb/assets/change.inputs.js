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
var updateFuel = function(document) {
    var gallons = parseFloat(document.getElementById('gallons').value);
    document.getElementById('tank').value = gallons * 6;
};
var updateTotalWeight = function(document) {
    var weight = parseFloat(document.getElementById('baggage-2').value)
		+ parseFloat(document.getElementById('baggage-1').value)
		+ parseFloat(document.getElementById('tank').value)
		+ parseFloat(document.getElementById('back-seat-left').value)
		+ parseFloat(document.getElementById('back-seat-right').value)
		+ parseFloat(document.getElementById('front-seat-left').value)
		+ parseFloat(document.getElementById('front-seat-right').value)
		+ parseFloat(document.getElementById('zerofuel-weight').value)
		;
    document.getElementById('total-weight').innerHTML = 'Ramp weight: ' + weight + ' lbs';
};
