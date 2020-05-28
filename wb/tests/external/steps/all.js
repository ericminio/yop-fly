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
Before((testCase, done)=>{
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
When('I click to refresh the graphs', function(done) {
    browser.click('#go')
    setTimeout(()=>{done();}, 300)
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
Given('the selected plane is {string}', function (name) {
    browser.assert.input('#planes', name)
});
When('I select the plane {string}', function (name) {
    browser.select('planes', name)
});
Then('I see that the plane\'s weight is {string}', function (value) {
    browser.assert.input('#zerofuel-weight', value)
});
Then('I see that the plane\'s moment is {string}', function (value) {
    browser.assert.input('#zerofuel-moment', value)
});
Then('I see that the plane\'s arm is {string}', function (value) {
    browser.assert.text('#zerofuel-arm', '(arm:'+value+'in)')
});
When('I change the plane\'s weight to {string}', function (value) {
    browser.fill('#zerofuel-weight', value)
});
When('I change the plane\'s moment to {string}', function (value) {
    browser.fill('#zerofuel-moment', value)
});
When('I change the fuel\'s volume to {string}', function (value) {
    browser.fill('#gallons', value)
});
Then('I see that the fuel\'s weight is {string}', function (value) {
    browser.assert.input('#fuel', value)
});
Then('I see the normal envelope\'s points: {string}', function(value) {
    browser.assert.attribute('#envelope polyline.normal-category', 'points', value)
});
Then('I see the utility envelope\'s points: {string}', function(value) {
    browser.assert.attribute('#envelope polyline.utility-category', 'points', value)
});
Given('load is:', function (dataTable) {
    let loads = dataTable.rows();
    for (let i=0; i<loads.length; i++) {
        let station = loads[i][0];
        let weight = loads[i][1];
        browser.fill('#'+station, weight);
    }
});
Then('I see the {string} point at {string} with label {string}', function(point, value, label) {
    let x = value.split(',')[0].trim()
    let y = value.split(',')[1].trim()
    browser.assert.attribute('#envelope circle#'+point+'-circle', 'cx', x)
    browser.assert.attribute('#envelope circle#'+point+'-circle', 'cy', y)
    browser.assert.attribute('#envelope text#'+point+'-text', 'x', x)
    browser.assert.attribute('#envelope text#'+point+'-text', 'y', y)
    browser.assert.text('#envelope text#'+point+'-text', label)
});
Then('I see that the ramp weight is {string}', function (value) {
	browser.assert.text('#total-weight', 'Ramp weight: ' + value + ' lbs')
});
