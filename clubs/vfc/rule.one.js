let toDate = (entry)=> {
    return new Date(entry.year, entry.month-1, entry.day)
}
let dayDiff = (entry1, entry2)=>{
    let diff = toDate(entry2).getTime() - toDate(entry1).getTime()
    return diff / (1000*3600*24)
}

module.exports = {
    isCleared: (date, log)=> {
        let last = log.entries[log.entries.length-1]        
        let diff = dayDiff(last, date)

        return diff < 60
    }
}