let expect = require('chai').expect;
let jsdom = require("jsdom");
let { JSDOM } = jsdom;
let {
    drawGraph,
    drawEnvelope,
    convertPointForEnvelopeGraph,
    drawEnvelopeGraph
} = require('../wb.js');

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
            <svg id="envelope" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            	<rect x="0" y="0" width="100" height="100" stroke="WhiteSmoke" fill="lightgray" stroke-width="0"/>
            </svg>
            <svg id="load" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            	<rect x="0" y="0" width="100" height="100" stroke="WhiteSmoke" fill="lightgray" stroke-width="0"/>
            </svg>
        `, { runScripts: 'dangerously' }).window;
        document = window.document;
    });

    describe('ramp point', ()=>{
        beforeEach(()=>{
            drawGraph(document);
            graph = document.getElementById('envelope');
        });
        it('is displayed', ()=>{
            expect(graph.innerHTML).to.contain('<circle cx="51" cy="40" r="1" stroke="orange" stroke-width="1" fill="lightgray">');
        });
        it('is marked', ()=>{
            expect(graph.innerHTML).to.contain('<text fill="black" x="51" y="40" font-size="3">ramp</text>');
        });
    });
    describe('zero-fuel point', ()=>{
        beforeEach(()=>{
            drawGraph(document);
            graph = document.getElementById('envelope');
        });
        it('is displayed', ()=>{
            expect(graph.innerHTML).to.contain('<circle cx="37" cy="61" r="1" stroke="orange" stroke-width="1" fill="lightgray"></circle>');
        });
        it('is marked', ()=>{
            expect(graph.innerHTML).to.contain('<text fill="black" x="37" y="61" font-size="3">zero fuel</text>');
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
            drawEnvelope(document, points, 'blue');

            expect(graph.innerHTML).to.contain('<polyline points="0,100 100,0 " style="fill:none;stroke:blue;stroke-width:1"></polyline>');
        });
    });

    let data = {
        totals: {
            weight:2164.90,
            moment:87930
        },
        zerofuel: {
            weight:1924.90,
            moment:76410
        },
        plane: {
            envelopes: {
                normal: {
                    color: 'blue',
                    points: [
                        { x:45, y:1500 },
                        { x:130, y:2600 }
                    ]
                },
                utility: {
                    color: 'green',
                    points: [
                        { x:45, y:2600 },
                        { x:130, y:1500 }
                    ]
                }
            }
        }
    };

    it('displays normal category shape', ()=>{
        drawEnvelopeGraph(document, data);
        graph = document.getElementById('envelope');

        expect(graph.innerHTML).to.contain('<polyline points="0,100 100,0 " style="fill:none;stroke:blue;stroke-width:1"></polyline>');
    });

    it('displays utility category shape', ()=>{
        drawEnvelopeGraph(document, data);
        graph = document.getElementById('envelope');

        expect(graph.innerHTML).to.contain('<polyline points="0,0 100,100 " style="fill:none;stroke:green;stroke-width:1"></polyline>');
    });
});
