const { expect } = require('chai')
const rule = require('./rule.two')

describe('rule #2', ()=>{

    it('says you can fly when you flew 12h in the last 12 months', ()=>{
        let log = {
            entries: [                
                { day: 15, month:10, year:2014, time:11 },
                { day: 15, month:1, year:2015, time:1 }
            ]
        }
        let today = { day: 22, month:1, year:2015 }

        expect(rule.isCleared(today, log)).to.equal(true)
    })
})