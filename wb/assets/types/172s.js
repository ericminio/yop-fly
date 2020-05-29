types.push({
    id: '172s',
    stations: [
        {
            id: 'frontseat',
            maxWeight: 400,
            arm: 37
        },
        {
            id: 'backseat',
            maxWeight: 400,
            arm: 73
        },
        {
            id: 'tank',
            maxWeight: 318,
            arm: 48
        },
        {
            id: 'baggage1',
            maxWeight: 120,
            arm: 95
        },
        {
            id: 'baggage2',
            maxWeight: 50,
            arm: 123
        }
    ],
    diagrams: [
        {
            id: 'weightAndBalance',
            ranges: {
                min: { x:45, y:1500 },
                max: { x:130, y:2600 }
            },
            envelopes: [
                {
                    id: 'normal-category',
                    points: [
                        { x:52, y:1500 },
                        { x:68, y:1950 },
                        { x:83, y:2200 },
                        { x:104.5, y:2550 },
                        { x:121, y:2550 },
                        { x:70.5, y:1500 }
                    ]
                },
                {
                    id: 'utility-category',
                    points: [
                        { x:52, y:1500 },
                        { x:68, y:1950 },
                        { x:83, y:2200 },
                        { x:89, y:2200 },
                        { x:60.5, y:1500 }
                    ]
                }
            ]
        },
        {
            id: 'loading',
            ranges: {
                min: { x:0, y:0 },
                max: { x:35, y:450 }
            }
        }        
    ],
    injectFlight: function(document, plane) {
        station('frontseat', plane).weight = parseFloat(document.getElementById('front-seat-left').value) + parseFloat(document.getElementById('front-seat-right').value);
        station('backseat', plane).weight = parseFloat(document.getElementById('back-seat-left').value) + parseFloat(document.getElementById('back-seat-right').value);
        station('tank', plane).weight = parseFloat(document.getElementById('tank').value);
        station('baggage1', plane).weight = parseFloat(document.getElementById('baggage-1').value);
        station('baggage2', plane).weight = parseFloat(document.getElementById('baggage-2').value);
        plane.weight = parseFloat(document.getElementById('zerofuel-weight').value);
        plane.moment = parseFloat(document.getElementById('zerofuel-moment').value);
    },
    updateFuel: function(document) {
        var gallons = parseFloat(document.getElementById('gallons').value);
        document.getElementById('tank').value = gallons * 6;
    }    
});
