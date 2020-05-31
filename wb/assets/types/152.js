types.push({
    id: '152',
    stations: [
        {
            id: 'frontseat',
            maxWeight: 400,
            arm: 39,
            count: 2
        },
        {
            id: 'tank',
            maxWeight: 150,
            arm: 42,
            count: 1
        },
        {
            id: 'baggage1',
            maxWeight: 120,
            arm: 64,
            count: 1
        },
        {
            id: 'baggage2',
            maxWeight: 40,
            arm: 84,
            count: 1
        }
    ],
    diagrams: [
        {
            id: 'loading',
            ranges: {
                min: { x:0, y:0 },
                max: { x:18, y:450 }
            }
        },   
        {
            id: 'weightAndBalance',
            ranges: {
                min: { x:30, y:1000 },
                max: { x:65, y:1800 }
            },
            envelopes: [
                {
                    id: 'normal-category',
                    points: [
                        { x:31, y:1000 },
                        { x:40, y:1300 },
                        { x:51.5, y:1670 },
                        { x:61, y:1670 },
                        { x:36.5, y:1000 }
                    ]
                },
                {
                    id: 'utility-category',
                    points: [
                        { x:31, y:1000 },
                        { x:40, y:1300 },
                        { x:51.5, y:1670 },
                        { x:61, y:1670 },
                        { x:36.5, y:1000 }
                    ]
                }
            ]
        },
        {
            id: 'cg',
            ranges: {
                min: { x:30, y:1000 },
                max: { x:37, y:1800 }
            },
            envelopes: [
                {
                    id: 'normal-category',
                    points: [
                        { x:31, y:1000 },
                        { x:31, y:1350 },
                        { x:32.65, y:1670 },
                        { x:36.5, y:1670 },
                        { x:36.5, y:1000 }
                    ]
                },
                {
                    id: 'utility-category',
                    points: [
                        { x:31, y:1000 },
                        { x:31, y:1350 },
                        { x:32.65, y:1670 },
                        { x:36.5, y:1670 },
                        { x:36.5, y:1000 }
                    ]
                }
            ]
        }
    ]
});
