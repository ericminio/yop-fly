const { expect } = require('chai')
const rule = require('./rule.two')

describe('rule #2', ()=>{

    let log = {
        entries: [                
            { day: 15, month:2, year:2014, time:1 },
            { day: 15, month:10, year:2014, time:10 },
            { day: 15, month:1, year:2015, time:1 }
        ]
    }
    it('says you can fly when you flew 12 h during the last 12 months', ()=>{
        let today = { day: 14, month:2, year:2015 }

        expect(rule.isCleared(today, log)).to.equal(true)
    })
    it('says you cannot fly when you did not fly enough', ()=>{
        let today = { day: 15, month:2, year:2015 }

        expect(rule.isCleared(today, log)).to.equal(false)
    })
    it('resists empty log', ()=>{
        expect(rule.isCleared({ day: 15, month:1, year:2015 }, { entries:[] })).to.equal(false)
    })
    
    describe('grounding', ()=>{
        
        it('may happen', ()=>{
            expect(rule.firstGroundedDate(log)).to.deep.equal({ day: 15, month:2, year:2015 })
        })
        it('resists empty log', ()=>{
            expect(rule.firstGroundedDate({ entries:[] })).to.deep.equal({ day: 1, month:1, year:9999 })
        })
    })
})