var dayOfTheWeek = function(day, month, year) {
    let dayofYear,dayofMonth;
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30]
    let resarr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    dayofYear = (year - 1971) * 365 + (year>1972 ? (1+Math.floor((year-1972-1)/4)):0);
    function getDayofMonth(month){
        let res = 0;
        for(let i=0;i<month-1;i++){
            res+= (i===1 && year % 4 ===0)? 29 : months[i]
        }
        return res;
    }
    dayofMonth = getDayofMonth(month);
    const allDay = dayofMonth + dayofYear + day 
    const resday = allDay>2 ? (allDay-3)%7 : allDay+4
    return resarr[resday]
};
dayOfTheWeek(31,8,2100)