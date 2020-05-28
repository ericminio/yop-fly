let expect = require('chai').expect;
let jsdom = require("jsdom");
let { JSDOM } = jsdom;
let {
    drawGraphs,
    drawEnvelope,
    drawEnvelopeGraph
} = require('../../assets/wb.js');

describe('Moment envelope graph', ()=>{

    let document;
    let graph;

    beforeEach(()=>{
        let window = new JSDOM(`
            <input id="zerofuel-weight" value="1649.90" />
            <input id="zerofuel-moment" value="66232.4" />
            <input id="front-seat-left" value="170" />
            <input id="front-seat-right" value="105" />
            <input id="back-seat-left" value="0" />
            <input id="back-seat-right" value="0" />
            <input id="gallons" value="40" />
            <input id="fuel" value="240" />
            <input id="baggage-1" value="0" />
            <input id="baggage-2" value="0" />
            <svg id="envelope" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80">
            	<rect x="0" y="0" width="100" height="100" stroke="WhiteSmoke" fill="lightgray" stroke-width="0"/>
            </svg>
            <svg id="load" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80">
            	<rect x="0" y="0" width="100" height="100" stroke="WhiteSmoke" fill="lightgray" stroke-width="0"/>
            </svg>
        `, { runScripts: 'dangerously' }).window;
        document = window.document;
        document.plane = {
            totals: { weight:0, moment:0 },
            zerofuel: { weight:0, moment:0 },
            type: {
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
                graphs: [
                    {
                        type: 'weightAndBalance',
                        ranges: {
                            min: { x:45, y:1500 },
                            max: { x:130, y:2600 }
                        }
                    },
                    {
                        type: 'loading',
                        ranges: {
                            min: { x:0, y:0 },
                            max: { x:35, y:450 }
                        }
                    }        
                ],
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
            }
        }
    });

    describe('ramp point', ()=>{
        beforeEach(()=>{
            drawGraphs(document);
            graph = document.getElementById('envelope');
        });
        it('is displayed', ()=>{
            expect(graph.innerHTML).to.contain('<circle id="ramp-circle" cx="51" cy="32" r="2" class="actual"></circle><text id="ramp-text" fill="black" x="51" y="32" font-size="3">ramp</text>');
        });
    });
    describe('zero-fuel point', ()=>{
        beforeEach(()=>{
            drawGraphs(document);
            graph = document.getElementById('envelope');
        });
        it('is displayed', ()=>{
            expect(graph.innerHTML).to.contain('<circle id="zero-fuel-circle" cx="37" cy="49" r="2" class="actual"></circle><text id="zero-fuel-text" fill="black" x="37" y="49" font-size="3">zero fuel</text>');
        });
    });
    describe('boundaries', ()=>{
        beforeEach(()=>{
            graph = document.getElementById('envelope');
        });
        it('are what we expect', ()=>{
            let points = [];
            points.push({ x:45, y:1500 });
            points.push({ x:130, y:2600 });
            drawEnvelope(document, { element:graph, ranges:{ min:{x:45, y:1500}, max:{x:130, y:2600}} }, { points:points, id:'this-envelope' });

            expect(graph.innerHTML).to.contain('<polyline points="0,80 100,0" class="this-envelope"></polyline>');
        });
    });    

    it('displays normal category shape', ()=>{
        drawEnvelopeGraph(document, document.plane);
        graph = document.getElementById('envelope');

        expect(graph.innerHTML).to.contain('<polyline points="8,80 27,47 45,29 70,4 89,4 30,80" class="normal-category">');
    });

    it('displays utility category shape', ()=>{
        drawEnvelopeGraph(document, document.plane);
        graph = document.getElementById('envelope');

        expect(graph.innerHTML).to.contain(' <polyline points="8,80 27,47 45,29 52,29 18,80" class="utility-category">');
    });
});
