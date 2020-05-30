let expect = require('chai').expect;
let { JSDOM } = require("jsdom");
let fs = require('fs');
let decodeFlight = (new Function( fs.readFileSync('./assets/encoding.js').toString() + ' return decodeFlight;'))();
let encodeFlight = (new Function( fs.readFileSync('./assets/encoding.js').toString() + ' return encodeFlight;'))();

describe.only('Encode/Decode', ()=>{

    let window;
    beforeEach(()=>{
        window = new JSDOM(``, { runScripts: 'dangerously' }).window;
    });

    it('is provided by window', ()=>{
        let flight = {
            plane: 'CGSDZ',
            'front-seat-left': 10,
            'front-seat-right': 20,
            'back-seat-left:': 30,
            'back-seat-right': 40,
            'gallons': 50,
            'tank': 300,
            'baggage-1': 60,
            'baggage-2': 70
        }
        let encoded = encodeFlight(flight, window);
        expect(encoded).to.equal('eyJwbGFuZSI6IkNHU0RaIiwiZnJvbnQtc2VhdC1sZWZ0IjoxMCwiZnJvbnQtc2VhdC1yaWdodCI6MjAsImJhY2stc2VhdC1sZWZ0OiI6MzAsImJhY2stc2VhdC1yaWdodCI6NDAsImdhbGxvbnMiOjUwLCJ0YW5rIjozMDAsImJhZ2dhZ2UtMSI6NjAsImJhZ2dhZ2UtMiI6NzB9')

        let decoded = window.atob('eyJwbGFuZSI6IkNHU0RaIiwiZnJvbnQtc2VhdC1sZWZ0IjoxMCwiZnJvbnQtc2VhdC1yaWdodCI6MjAsImJhY2stc2VhdC1sZWZ0OiI6MzAsImJhY2stc2VhdC1yaWdodCI6NDAsImdhbGxvbnMiOjUwLCJ0YW5rIjozMDAsImJhZ2dhZ2UtMSI6NjAsImJhZ2dhZ2UtMiI6NzB9');
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
