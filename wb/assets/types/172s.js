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
            id: 'fuel',
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
            type: 'weightAndBalance',
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
            type: 'loading',
            ranges: {
                min: { x:0, y:0 },
                max: { x:35, y:450 }
            }
        }        
    ]    
});