module.exports = {
    isCleared: (date, log)=> {
        let selected = log.entries.filter(entry => 
            entry.year == date.year && entry.month <= date.month
            ||
            entry.year == date.year-1 && entry.month > date.month
            ||
            entry.year == date.year-1 && entry.month == date.month && entry.day > date.day
        )

        return selected.reduce((acc, curr)=> acc + curr.time, 0) >= 12
    },
    firstGroundedDate: (log)=>{
        let candidate
        let total = 0
        for (let i = log.entries.length-1; i>=0; i--) {
            candidate = log.entries[i]    
            total += candidate.time
            if (total >= 12) {
                break
            }
        }
        
        return candidate !== undefined ? 
            { day:candidate.day, month:candidate.month, year:candidate.year+1 }
            : { day:1, month:1, year:9999 }
    }
}