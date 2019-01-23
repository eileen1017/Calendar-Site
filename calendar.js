let today = new Date();
let curMonth = today.getMonth();
let curYear = today.getFullYear();
let selectMonth = document.getElementById("month-selector");
let selectYear = document.getElementById("year-selector");
let logincheck = false;



// let months = ["January","February","March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
let months = ["January","February","March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
let month_year = document.getElementById("month-year");
displayCalendar(curMonth,curYear,logincheck);

if (document.getElementById("token").value != "") {
	logincheck = true;

}


console.log("this is logincheck"+logincheck);
document.getElementById("next").onclick = function () {
	curYear = (curMonth === 11) ? curYear + 1 : curYear;
	curMonth = (curMonth + 1) % 12
	displayCalendar(curMonth,curYear,logincheck);
}

document.getElementById("previous").onclick = function () {
	curYear = (curMonth === 0) ? curYear - 1 : curYear;
	curMonth = (curMonth === 0) ? 11 : curMonth - 1;
	displayCalendar(curMonth,curYear,logincheck)
}

document.getElementById("month-selector").onchange = function () {

	curYear = parseInt(selectYear.value);
	curMonth = parseInt(selectMonth.value);
	displayCalendar(curMonth,curYear,logincheck);
}


document.getElementById("year-selector").onchange = function () {
	curYear = parseInt(selectYear.value);
	curMonth = parseInt(selectMonth.value);
	displayCalendar(curMonth,curYear,logincheck);
}

function displayCalendar(month,year,logincheck) {
	let first = (new Date(year,month)).getDay();
	let daysOfMonth = 32 - new Date(year,month,32).getDate();
	cbody = document.getElementById("calendar-body");

	cbody.innerHTML = "";

	month_year.innerHTML = months[month] + " " + year;

	selectYear.value = year;
	selectMonth.value = month;

	


	let date = 1;
	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < first) {
				let cell = document.createElement("td");
				let cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			else if (date > daysOfMonth) {
				break;

			}
			else {
				let cell = document.createElement("td");
				cell.id = date;
				let cellText = document.createTextNode(date);

				if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
					cell.classList.add("todayclass");
				}
				cell.appendChild(cellText);
				row.appendChild(cell);

				// let day = year + "-" + (month+1) + "-" + date;
				let day = year + "-" + (month+1) + "-" + date;
				if (logincheck == true) {
					
					//console.log("This is day:" + day);
					
					UpdateEventTable(day);
				}
				
				date++;
			}

		}
		cbody.appendChild(row);
	}

} 



