let fs = require('fs');
let expect = require('chai').expect;
let { JSDOM } = require("jsdom");
var loadTypes = (new Function( fs.readFileSync('./assets/digest.js').toString() + ' return loadTypes;'))();
var loadPlanes = (new Function( fs.readFileSync('./assets/digest.js').toString() + ' return loadPlanes;'))();
var selectPlane = (new Function( fs.readFileSync('./assets/change.inputs.js').toString() + ' return selectPlane;'))();

describe('Select plane', ()=>{

    let document;
    beforeEach(()=>{
        let window = new JSDOM(`
            <select name="planes" id="planes"></select>
            <input id="zerofuel-weight" />
            <input id="zerofuel-moment" />
            <label id="zerofuel-arm"></label>
        `, { runScripts: 'dangerously' }).window;
        document = window.document;
    });

    it('stores selected plane in document', ()=>{
        let types = [
            { id:'ignored-here' }
        ]
        let planes = [
            { name:'first', selected:'no' },
            { name:'second', selected:'yes' }
        ]
        loadTypes(document, types);
        loadPlanes(document, planes);
        selectPlane(document, 'second');        

        expect(document.plane.selected).to.equal('yes');
    });

    it('resists unknown plane', ()=>{
        let types = [
            { id:'ignored-here' }
        ]
        let planes = [
            { name:'first' },
            { name:'second' }
        ]
        loadTypes(document, types);
        loadPlanes(document, planes);
        selectPlane(document, 'unknown');        

        expect(document.plane.name).to.equal('first');
    });
});
