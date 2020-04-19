module.exports = {
    isCleared: (date, log)=> {
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
    }
}