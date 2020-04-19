const { expect } = require('chai')
const rule = require('./rule.one')

describe('rule #1', ()=>{

    let log = {
        entries: [                
            { day: 15, month:10, year:2014 },
            { day: 15, month:1, year:2015 }
        ]
    }
    it('says you can fly when you flew once during the last 2 months', ()=>{
        let today = { day: 14, month:3, year:2015 }

        expect(rule.isCleared(today, log)).to.equal(true)
    })
    it('says you cannot fly when it\'s been too long', ()=>{
        let today = { day: 15, month:3, year:2015 }

        expect(rule.isCleared(today, log)).to.equal(false)
    })
    describe('grounding', ()=>{
        
        it('may happen', ()=>{
            expect(rule.firstGroundedDate(log)).to.deep.equal({ day: 15, month:3, year:2015 })
        })
        it('resists december', ()=>{
            expect(rule.firstGroundedDate({entries:[{ day:15, month:12, year:2014 }]}))
                .to.deep.equal({ day: 15, month:2, year:2015 })
        })
        it('resists november', ()=>{
            expect(rule.firstGroundedDate({entries:[{ day:15, month:11, year:2014 }]}))
                .to.deep.equal({ day: 15, month:1, year:2015 })
        })
        it('resists empty log', ()=>{
            expect(rule.firstGroundedDate({ entries:[] })).to.deep.equal({ day: 1, month:1, year:2020 })
        })
    })
})