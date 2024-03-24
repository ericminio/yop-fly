types.push({
    id: "172n",
    stations: [
        {
            id: "frontseat",
            maxWeight: 400,
            arm: 37,
            count: 2,
        },
        {
            id: "backseat",
            maxWeight: 400,
            arm: 73,
            count: 2,
        },
        {
            id: "tank",
            maxWeight: 300,
            arm: 48,
            count: 1,
        },
        {
            id: "baggage1",
            maxWeight: 120,
            arm: 95,
            count: 1,
        },
        {
            id: "baggage2",
            maxWeight: 50,
            arm: 123,
            count: 1,
        },
    ],
    diagrams: [
        {
            id: "weightAndBalance",
            ranges: {
                min: { x: 45, y: 1500 },
                max: { x: 115, y: 2400 },
            },
            envelopes: [
                {
                    id: "normal-category",
                    points: [
                        { x: 52, y: 1500 },
                        { x: 68, y: 1950 },
                        { x: 71, y: 2000 },
                        { x: 88.5, y: 2300 },
                        { x: 109, y: 2300 },
                        { x: 70, y: 1500 },
                    ],
                },
                {
                    id: "utility-category",
                    points: [
                        { x: 52, y: 1500 },
                        { x: 68, y: 1950 },
                        { x: 71, y: 2000 },
                        { x: 81.5, y: 2000 },
                        { x: 60.5, y: 1500 },
                    ],
                },
            ],
        },
        {
            id: "loading",
            ranges: {
                min: { x: 0, y: 0 },
                max: { x: 35, y: 450 },
            },
        },
        {
            id: "cg",
            ranges: {
                min: { x: 34, y: 1500 },
                max: { x: 48, y: 2400 },
            },
            envelopes: [
                {
                    id: "normal-category",
                    points: [
                        { x: 35, y: 1500 },
                        { x: 35, y: 1950 },
                        { x: 35.5, y: 2000 },
                        { x: 38.5, y: 2300 },
                        { x: 47.3, y: 2300 },
                        { x: 47.3, y: 1500 },
                    ],
                },
                {
                    id: "utility-category",
                    points: [
                        { x: 35, y: 1500 },
                        { x: 35, y: 1950 },
                        { x: 35.5, y: 2000 },
                        { x: 40.5, y: 2000 },
                        { x: 40.5, y: 1500 },
                    ],
                },
            ],
        },
    ],
});
