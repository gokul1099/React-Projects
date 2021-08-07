
export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export const hoursPerDay = ["1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"]
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
/*
  * return all the dates along with their day in object format {day:,date:}
  * @param {Number} month
  *  @param {Number} year
*/

export const getDays = function (month, year) {
    var monthIndex = month
    var date = new Date(year, monthIndex, 1)
    var result = []
    while (date.getMonth() === monthIndex) {
        result.push({
            date: date.getDate(),
            day: date.getDay()
        })
        date.setDate(date.getDate() + 1)
    }
    return result
}

export const getCalender = function (month, year) {

    const daysInMonth = getDays(month, year)
    console.log(daysInMonth)
    var daysIndex = 0
    const calender = Array.from(Array(5), _ => Array(7).fill(0));
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 7; col++) {
            if (daysInMonth[daysIndex]) {
                var index = daysInMonth[daysIndex].day
                calender[row][index] = daysInMonth[daysIndex].date
                daysIndex += 1
                if (index >= 6) {
                    break
                }
            }

        }
    }
    return calender
}