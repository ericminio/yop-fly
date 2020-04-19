module.exports = {
    isCleared: (date, log)=> {
        if (log.entries.length == 0) { return false }

        let entry = log.entries[log.entries.length-1]
        let cleared = 
            entry.year == date.year && entry.month == date.month
            ||
            entry.year == date.year && entry.month == date.month-1
            ||
            entry.year == date.year && entry.month == date.month-2 && entry.day > date.day
            ||
            entry.year == date.year-1 && entry.month == 12 && date.month == 1
            ||
            entry.year == date.year-1 && entry.month == 12 && date.month == 2 && entry.day > date.day
            ||
            entry.year == date.year-1 && entry.month == 11 && date.month == 1 && entry.day > date.day

        return cleared
    },
    firstGroundedDate: (log)=>{
        if (log.entries.length == 0) { return { day:1, month:1, year:2020 } }

        let candidate = log.entries[log.entries.length-1]
        if ([11, 12].indexOf(candidate.month) != -1) {
            return { day:candidate.day, month:candidate.month-12+2, year:candidate.year+1 }
        }
        
        return { day:candidate.day, month:candidate.month+2, year:candidate.year }
    }
}