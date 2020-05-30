let expect = require('chai').expect;
let { JSDOM } = require("jsdom");
let fs = require('fs');
let decodeFlight = (new Function( fs.readFileSync('./assets/decode.flight.js').toString() + ' return decodeFlight;'))();

describe('Encode/Decode', ()=>{

    let window;
    beforeEach(()=>{
        window = new JSDOM(``, { runScripts: 'dangerously' }).window;
    });

    it('is provided by window', ()=>{
        let flight = {
            plane: 'CGSDZ'
        }
        let encoded = window.btoa(JSON.stringify(flight));
        expect(encoded).to.equal('eyJwbGFuZSI6IkNHU0RaIn0=')

        let decoded = window.atob('eyJwbGFuZSI6IkNHU0RaIn0=');
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
