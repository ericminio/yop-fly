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
    }
}