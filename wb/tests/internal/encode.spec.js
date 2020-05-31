let expect = require('chai').expect;
let { JSDOM } = require("jsdom");
let fs = require('fs');
let decodeFlight = (new Function( fs.readFileSync('./assets/encoding.js').toString() + ' return decodeFlight;'))();
let encodeFlight = (new Function( fs.readFileSync('./assets/encoding.js').toString() + ' return encodeFlight;'))();

describe('Encode/Decode', ()=>{

    let window;
    beforeEach(()=>{
        window = new JSDOM(``, { runScripts: 'dangerously' }).window;
    });

    it('is provided by window', ()=>{
        let flight = {
            plane: 'CGSDZ',
            'frontseat-1': "180",
            'frontseat-2': "110",
            'backseat-1': "120",
            'backseat-2': "130",
            'gallons': "30",
            'tank': "180",
            'baggage1': "55",
            'baggage2': "25"
        }
        let actual = encodeFlight(flight, window);
        let expected = 'eyJwbGFuZSI6IkNHU0RaIiwiZnJvbnRzZWF0LTEiOiIxODAiLCJmcm9udHNlYXQtMiI6IjExMCIsImJhY2tzZWF0LTEiOiIxMjAiLCJiYWNrc2VhdC0yIjoiMTMwIiwiZ2FsbG9ucyI6IjMwIiwidGFuayI6IjE4MCIsImJhZ2dhZ2UxIjoiNTUiLCJiYWdnYWdlMiI6IjI1In0=';
        expect(actual).to.equal(expected)

        let decoded = window.atob(expected);
        let parsed = JSON.parse(decoded);
        expect(parsed).to.deep.equal(flight);
    });

    it('can be very useful', ()=>{
        let search = '?flight=eyJwbGFuZSI6IkNHU0RaIn0=';
        let flight = decodeFlight(search, window);

        expect(flight.plane).to.equal('CGSDZ');
    });
    it('needs to resist crappy input', ()=>{
        let search = '?flight=random-stuff';
        let flight = decodeFlight(search, window);

        expect(flight).to.equal(undefined);
    });
    it('needs to resist bad query string', ()=>{
        let search = '?any=random-stuff';
        let flight = decodeFlight(search, window);

        expect(flight).to.equal(undefined);
    });
    it('needs to resist almost good query string, but no', ()=>{
        let search = '?before=stuff&flight=eyJwbGFuZSI6IkNHU0RaIn0=&after=stuff';
        let flight = decodeFlight(search, window);

        expect(flight).to.equal(undefined);
    });
});
