var initializeStations = function(plane) {
    plane.stations = [];
    for (var i=0; i<plane.type.stations.length; i++) {
        var station = plane.type.stations[i];
        plane.stations.push({
            id: station.id,
            arm:station.arm,
            weight:0,
            maxWeight:station.maxWeight,
            count: station.count
        });
    }        
};
var station = function(id, plane) {
    for (var i=0; i<plane.stations.length; i++) {
        var candidate = plane.stations[i];
        if (candidate.id == id) {
            return candidate;
        }
    }
};
var diagramWithId = function(id, plane) {
    var diagrams = plane.type.diagrams;
    for (var i=0; i<diagrams.length; i++) {
        var candidate = diagrams[i];
        if (candidate.id == id) {
            return candidate;
        }
    }
};
var envelope = function(id, diagram) {
    var envelopes = diagram.envelopes;
    for (var i=0; i<envelopes.length; i++) {
        var candidate = envelopes[i];
        if (candidate.id == id) {
            return candidate;
        }
    }
};
var computeMoment = function(station) {
    station.moment = station.weight * station.arm;
};
var computeMoments = function(plane) {
    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i];
        computeMoment(station);
    }    
};
var computeTotals = function(plane) {
    plane.totals = { weight:plane.weight, moment:plane.moment };    
    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i];
        plane.totals.weight += station.weight;
        plane.totals.moment += station.moment;     
    }
};
var computeZeroFuel = function(plane) {
    plane.zerofuel = { weight:plane.weight, moment:plane.moment };
    for (var i=0; i<plane.stations.length; i++) {
        var station = plane.stations[i];
        if (station.id.indexOf('tank') == -1) {
            plane.zerofuel.weight += station.weight;
            plane.zerofuel.moment += station.moment;
        }
    }
};
