const {
    Before,
    After,
    Given,
    When,
    Then
} = require('cucumber');
const Browser = require('zombie');
const browser = new Browser();
const fs = require('fs');
const { expect } = require('chai');
let LocalServer = require('../../support/local.server');

let server;
Before((done)=>{
    server = new LocalServer({
        '/': fs.readFileSync('./index.html').toString(),
    });
    server.start(()=>{
        browser.visit('http://localhost:' + server.port, done);
    });
});
After((done)=>{
    if (server) {server.stop(done);}
    else { done(); }
});

Given('the following planes:', function (value) {
    let planes = 'let planes=[\n'+ value + '\n];'
    server.handler['/assets/planes.js'] = planes;
});
When('I access the home page', (done) => {
    browser.visit('http://localhost:' + server.port, ()=>{
        setTimeout(()=>{done();}, 300)
    });
});

Then('I see that the only planes that can be selected are:', (value) => {
    let select = browser.document.getElementById('planes');
    let expected = value.split('\n').map((item)=>item.trim())
    let options = select.querySelectorAll('option')
    expect(options.length).to.equal(expected.length)

    for (let i=0; i<expected.length; i++) {
        let found = false;
        for (let j=0; j<options.length; j++) {
            if (options[j].innerHTML == expected[i]) {
                found = true;
            }
        }
        if (! found) {
            throw 'missing ' + expected[i]
        }
    }
});
When('I select the plane {string}', function (name) {
    browser.select('planes', name)
});
Then('I see that the field for plane\'s weight contains {string}', function (value) {
    expect(browser.document.getElementById('zerofuel-weight').value).to.equal(value)
});
Then('I see that the field for plane\'s moment contains {string}', function (value) {
    expect(browser.document.getElementById('zerofuel-moment').value).to.equal(value)
});
Then('I see that the field for plane\'s arm contains {string}', function (value) {
    expect(browser.document.getElementById('zerofuel-arm').innerHTML).to.equal('(arm:'+value+'in)')
});
