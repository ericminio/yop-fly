let fs = require('fs');
let expect = require('chai').expect;
let { JSDOM } = require("jsdom");
var loadPlanes = (new Function( fs.readFileSync('./assets/digest.js').toString() + ' return loadPlanes;'))();
var loadTypes = (new Function( fs.readFileSync('./assets/digest.js').toString() + ' return loadTypes;'))();

describe('Load planes', ()=>{

    let document;
    beforeEach(()=>{
        let window = new JSDOM(`
            <select name="planes" id="planes"></select>
        `, { runScripts: 'dangerously' }).window;
        document = window.document;
    });

    it('stores planes in document', ()=>{
        let types = [
            { id:'type-1', value:'not' },
            { id:'type-2', value:'expected' }
        ]
        let planes = [
            { name:'first', type:'type-1' },
            { name:'second', type:'type-2' },
            { name:'third', type:'type-2' }
        ]
        loadTypes(document, types);
        loadPlanes(document, planes);       

        expect(document.planes).to.deep.equal(planes);
    });
    it('copy type in plane', ()=>{
        let types = [
            { id:'type-1', value:'not' },
            { id:'type-2', value:'expected' }
        ]
        let planes = [
            { name:'first', type:'type-1' },
            { name:'second', type:'type-2' },
            { name:'third', type:'type-2' }
        ]
        loadTypes(document, types);
        loadPlanes(document, planes);

        expect(document.planes[2].type.value).to.equal('expected')
    });
});
