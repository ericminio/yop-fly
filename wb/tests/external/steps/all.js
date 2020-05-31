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
var chai = require('chai');
chai.use(require('chai-string'));
let LocalServer = require('../../support/local.server');

let server;
Before((testCase, done)=>{
    server = new LocalServer({
        '/': fs.readFileSync('./index.html').toString(),
        '/index.html': fs.readFileSync('./index.html').toString(),
    });
    server.start(()=>{
        browser.visit('http://localhost:' + server.port +'/', done);
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
When('I access the home page with flight info {string}', function (encoded, done) {
    browser.visit('http://localhost:' + server.port + '/?flight=' + encoded, ()=>{
        setTimeout(()=>{done();}, 300)
    });
});
When('I wait for the graphs to refresh', function(done) {
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
    browser.assert.input('#tank', value)
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
    browser.assert.attribute('circle#wb-'+point+'-circle', 'cx', x)
    browser.assert.attribute('circle#wb-'+point+'-circle', 'cy', y)
    browser.assert.attribute('text#wb-'+point+'-text', 'x', x)
    browser.assert.attribute('text#wb-'+point+'-text', 'y', y)
    browser.assert.text('text#wb-'+point+'-text', label)
});
Then('I see that the ramp weight is {string}', function (value) {
	browser.assert.text('#total-weight', 'Ramp weight: ' + value + ' lbs')
});
Then('I see the {string} loading line from origin to {string} with mark at {string}', function (station, max, mark) {
    let parts = max.split(',');
    let x = parts[0];
    let y = parts[1];
    browser.assert.attribute('#load line.station-'+station, 'x1', '0')
    browser.assert.attribute('#load line.station-'+station, 'y1', '80')
    browser.assert.attribute('#load line.station-'+station, 'x2', x)
    browser.assert.attribute('#load line.station-'+station, 'y2', y)
    browser.assert.attribute('#load text#loading-station-'+station+'-text', 'x', x)
    browser.assert.attribute('#load text#loading-station-'+station+'-text', 'y', y)
    browser.assert.text('#load text#loading-station-'+station+'-text', station)
    parts = mark.split(',');
    x = parts[0];
    y = parts[1];
    browser.assert.attribute('#load circle#loading-'+station+'.station-'+station, 'cx', x)
    browser.assert.attribute('#load circle#loading-'+station+'.station-'+station, 'cy', y)

    let element = browser.document.querySelector('#load circle#loading-'+station);
    let style = browser.window.getComputedStyle(element);
    let stroke = style.getPropertyValue('stroke');
});
Then('I see the CG graph displays the normal envelope\'s points: {string}', function(value) {
    browser.assert.attribute('#cg polyline.normal-category', 'points', value)
});
Then('I see the CG graph displays the utility envelope\'s points: {string}', function(value) {
    browser.assert.attribute('#cg polyline.utility-category', 'points', value)
});
Then('I see the CG graph displays the {string} point at {string} with label {string}', function(point, value, label) {
    let x = value.split(',')[0].trim()
    let y = value.split(',')[1].trim()
    browser.assert.attribute('circle#cg-'+point+'-circle', 'cx', x)
    browser.assert.attribute('circle#cg-'+point+'-circle', 'cy', y)
    browser.assert.attribute('text#cg-'+point+'-text', 'x', x)
    browser.assert.attribute('text#cg-'+point+'-text', 'y', y)
    browser.assert.text('text#cg-'+point+'-text', label)
});
Then('I see that the weight of station {string} is {string}', function (station, value) {
    browser.assert.input('#'+station, value)
});
Then('the flight link info is {string}', function (value) {
    let link = browser.document.getElementById('flight-link');
    expect(link.href).to.endsWith('?flight=' + value);
});
