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
            '/assets/wb.js': fs.readFileSync('./assets/draw.js').toString(),
            '/assets/planes.js': fs.readFileSync('./assets/planes.js').toString()
        });
        server.start(()=>{
            browser.visit('http://localhost:' + server.port, done);
        });
    });

    it('loads', ()=> {
        browser.assert.text('title', "Yop, fly!");
    });

});
