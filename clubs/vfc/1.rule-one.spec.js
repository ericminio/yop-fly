const { expect } = require('chai')
const rules = [
    require('./rule.one')
]

describe('rule #1', ()=>{

    it('says you can fly when you flew last week', ()=>{
        let log = {
            entries: [                
                { day: 15, month:10, year:2014 },
                { day: 15, month:1, year:2015 }
            ]
        }
        let today = { day: 22, month:1, year:2015 }

        expect(rules[0].isCleared(today, log)).to.equal(true)
    })
    it('says you cannot fly after 2 months', ()=>{
        let log = {
            entries: [
                { day: 15, month:10, year:2014 },
                { day: 15, month:1, year:2015 }
            ]
        }
        let today = { day: 20, month:3, year:2015 }

        expect(rules[0].isCleared(today, log)).to.equal(false)
    })
})