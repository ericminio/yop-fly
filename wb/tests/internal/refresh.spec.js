const Browser = require('zombie');
let browser = new Browser();
let LocalServer = require('../support/local.server');
let fs = require('fs');

describe('Page', function() {

    let server;
    afterEach((done)=>{
        if (server) {server.stop(done);}
        else { done(); }
    });

    beforeEach((done)=>{
        server = new LocalServer({
            '/': fs.readFileSync('./index.html').toString(),
            '/assets/wb.js': fs.readFileSync('./assets/wb.js').toString(),
            '/assets/planes.js': fs.readFileSync('./assets/planes.js').toString()
        });
        server.start(()=>{
            browser.visit('http://localhost:' + server.port, done);
        });
    });

    it('loads', ()=> {
        browser.assert.text('.title', 'Cessna 172s');
    });

    describe('refresh button', ()=>{

        beforeEach((done)=> {
            browser.click('#go', done);
        });

        it('should be successful', function() {
            browser.assert.success();
        });
    });

});
