let fs = require('fs');
let expect = require('chai').expect;
let { JSDOM } = require("jsdom");
var loadTypes = (new Function( fs.readFileSync('./assets/digest.js').toString() + ' return loadTypes;'))();

describe('Load types', ()=>{

    let document;
    beforeEach(()=>{
        let window = new JSDOM(`
        `, { runScripts: 'dangerously' }).window;
        document = window.document;
    });

    it('stores planes in document', ()=>{
        let types = [
            { id:'first' },
            { id:'second' }
        ]
        loadTypes(document, types);

        expect(document.types).to.deep.equal(types);
    });
});
