let selectPlane = function(document, name) {
    let plane;
    for (var i = 0; i < planes.length; i++) {
        if (planes[i].name == name) {
            plane = planes[i];
        }
    }
    document.getElementById('zerofuel-weight').value = plane.weight
    document.getElementById('zerofuel-moment').value = plane.moment
    updatePlaneArm(document);
};
var updatePlaneArm = function(document) {
    let moment = parseFloat(document.getElementById('zerofuel-moment').value)
    let weight = parseFloat(document.getElementById('zerofuel-weight').value)
    let arm = (moment / weight).toFixed(3);
    document.getElementById('zerofuel-arm').innerHTML = '(arm:' + arm + 'in)';
};
