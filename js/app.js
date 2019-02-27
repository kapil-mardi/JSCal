$(document).ready(function () {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "Septempber",
        "October",
        "November",
        "December"
    ]
    var fixedDate = new Date();
    var date = new Date();
    renderCalendar(date);

    $("#shiftLeft").click(function(event){
        event.preventDefault();
        date.setDate(date.getDate() - 30);
        renderCalendar(date);
    })

    $("#shiftRight").click(function(){
        event.preventDefault();
        date.setDate(date.getDate() + 30);
        renderCalendar(date);
    })

    function renderCalendar(date) {

        $("#calendarTable").find("tr:gt(0)").remove();

        var monthNumber = date.getMonth();
        $("#monthHolder").html(`${months[monthNumber]} ${date.getFullYear()}`)
        var today = new Date(date);
        var dayInWeek = today.getDay();
        var todayDate = today.getDate();
        var maxDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        var thisWeekSunday = todayDate - dayInWeek;

        while (thisWeekSunday > 0) {
            thisWeekSunday -= 7;
        }

        var monthStartDay = 1 - (thisWeekSunday);

        var totalDaysToDispaly = maxDaysInMonth + Math.abs(thisWeekSunday) + 1;

        var calendarTableBody = $('#calendarTableBody');
        var tr = "<tr>";
        for (let i = 1; i <= totalDaysToDispaly; i++) {
            if (i > monthStartDay) {
                let currentDate = i - monthStartDay;
                let td = '';
                if(fixedDate.getDate() == currentDate 
                    && fixedDate.getFullYear() == date.getFullYear()
                    && fixedDate.getMonth() == date.getMonth()){

                    td = `<td class='today'><b class>${currentDate}</b></td>`
                }else{
                    td = `<td>${currentDate}</td>`
                }
                tr += td;
            } else {
                let td = `<td></td>`;
                tr += td;
            }

            if (i % 7 == 0) {
                tr += "</tr>";
                calendarTableBody.append(tr);
                tr = "<tr>";
            }
        }

        if (!tr.endsWith("</tr>")) {
            tr += "</tr>";
            calendarTableBody.append(tr);
        }

    }
});