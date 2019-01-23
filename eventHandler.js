document.getElementById("add-event").onclick = function() {
	AddEvent();
}

document.getElementById("edit-event").onclick = function() {
	EditEvent();
}

 document.getElementById("delete-event").onclick = function () {
 	DeleteEvent();
}

document.getElementById("ShowDetials").onclick = function() {
	ShowDetails();
}


function AddEvent() {
	console.log("AddEvent called")
	var token = document.getElementById("token").value;
	var eventTitle = document.getElementById("eventTitle").value;
	console.log(eventTitle);
	var eventDate = document.getElementById("eventDate").value;
	var eventTime = document.getElementById("eventTime").value;
	var eventDescription = document.getElementById("eventDescription").value;
	var eventCategory = document.getElementById("eventCategory").options[document.getElementById("eventCategory").selectedIndex].text;
	var dataString = "eventTitle=" + encodeURIComponent(eventTitle) + "&eventDate=" + encodeURIComponent(eventDate) + "&eventTime=" + encodeURIComponent(eventTime) + "&eventDescription=" + encodeURIComponent(eventDescription) + "&eventCategory=" + encodeURIComponent(eventCategory)+ "&token=" + encodeURIComponent(token);
	// console.log(dataString);
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "addEvent.php", true);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.addEventListener("load", function (event) {
            	console.log(event);
            	console.log(event.target.responseText);
                var data = JSON.parse(event.target.responseText);
                if (data.addedEventSuccess) {
                	console.log(data.date);
                	var datelist = data.date.split("-");
                	
                	var options = document.createElement("option");
					options.setAttribute('value',data.eventId.toString());
					var txt = document.createTextNode(data.eventId.toString());
					options.appendChild(txt);						
					document.getElementById("eventId").appendChild(options);
					let selectMonth = document.getElementById("month-selector");
					let selectYear = document.getElementById("year-selector");
					curYear = parseInt(selectYear.value);
					curMonth = parseInt(selectMonth.value);
					displayCalendar(curMonth,curYear,logincheck = true);
					alert(data.message);

					document.getElementById('eventTitle').value = "";
					document.getElementById('eventDate').value = "";
					document.getElementById('eventCategory').value = "";
					document.getElementById('eventDescription').value = "";
					document.getElementById('eventTime').value = "";
           
                } else {
                	alert("Error");
                }
                console.log(data);
            }, false);
    xmlHttp.send(dataString);
}



function ShowDetails() {
	var category = ["Study","Work","Fun","Date","Travel","Family","Other"];
	var token = document.getElementById("token").value;
	if (document.getElementById("eventId").options[document.getElementById("eventId").selectedIndex] == "") {
		alert("Please choose a option in Id field.");
	} else {

		var eventId = document.getElementById("eventId").options[document.getElementById("eventId").selectedIndex].text;
	var dataString = "eventId=" + encodeURIComponent(eventId)+ "&token=" + encodeURIComponent(token);

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "getEventById.php", true);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.addEventListener("load", function (event) {
            	console.log(event);
            	console.log(event.target.responseText);
                var data = JSON.parse(event.target.responseText);
                if (data.getEventByIdSuccess) {
					console.log(data.eventCategory);
					document.getElementById('eventTitle').value = data.eventTitle;
					document.getElementById('eventDate').value = data.eventDate;
					document.getElementById('eventCategory').value = category.indexOf(data.eventCategory);
					document.getElementById('eventDescription').value = data.eventDescription;
					document.getElementById('eventTime').value = data.eventTime;

						
                } else { 
                	alert("Error");
                }
            }, false);
    xmlHttp.send(dataString);

	}

}



function EditEvent() {
	var token = document.getElementById("token").value;
	var eventId = document.getElementById("eventId").options[document.getElementById("eventId").selectedIndex].text;
    var eventTitle = document.getElementById("eventTitle").value;
	var eventDate = document.getElementById("eventDate").value;
	var eventTime = document.getElementById("eventTime").value;
	var eventDescription = document.getElementById("eventDescription").value;
	var eventCategory = document.getElementById("eventCategory").options[document.getElementById("eventCategory").selectedIndex].text;
	var dataString = "eventTitle=" + encodeURIComponent(eventTitle) + "&eventId=" + encodeURIComponent(eventId) + "&eventDate=" + encodeURIComponent(eventDate) + "&eventTime=" + encodeURIComponent(eventTime) + "&eventDescription=" + encodeURIComponent(eventDescription) + "&eventCategory=" + encodeURIComponent(eventCategory)+ "&token=" + encodeURIComponent(token);
	
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "editEvent.php", true);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.addEventListener("load", function (event) {
       			var data = JSON.parse(event.target.responseText);
                if (data.editEventSuccess) {
                	let selectMonth = document.getElementById("month-selector");
					let selectYear = document.getElementById("year-selector");
					curYear = parseInt(selectYear.value);
					curMonth = parseInt(selectMonth.value);
                	displayCalendar(curMonth,curYear,logincheck = true)
                	alert("Success: Edit Success");

                	document.getElementById('eventTitle').value = "";
					document.getElementById('eventDate').value = "";
					document.getElementById('eventCategory').value = "";
					document.getElementById('eventDescription').value = "";
					document.getElementById('eventTime').value = "";



                } else {
                	alert("Error: Edit Failure");
                }
            }, false);
    xmlHttp.send(dataString);
}

function DeleteEvent() {
	var token = document.getElementById("token").value;

	var eventId = document.getElementById("eventId").options[document.getElementById("eventId").selectedIndex].text;
	var dataString = "eventId=" + encodeURIComponent(eventId)+ "&token=" + encodeURIComponent(token);

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "deleteEvent.php", true);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.addEventListener("load", function (event) {
            	
                var data = JSON.parse(event.target.responseText);
                console.log(data.deleteEventSuccess);
                if (data.deleteEventSuccess) {
					x = document.getElementById("eventId");
					x.remove(x.selectedIndex);
					let selectMonth = document.getElementById("month-selector");
					let selectYear = document.getElementById("year-selector");
					curYear = parseInt(selectYear.value);
					curMonth = parseInt(selectMonth.value);
                	displayCalendar(curMonth,curYear,logincheck = true)

                } else { 
                	alert("Error");
                }
            }, false);
    xmlHttp.send(dataString);
}


function UpdateEventTable(date) {
	var token = document.getElementById("token").value;
	var eventColor = ["green","orange","purple","maroon","aqua","olive","gray"];
	var category = ["Study","Work","Fun","Date","Travel","Family","Other"];
	var allCategory = ["All","Study","Work","Fun","Date","Travel","Family","Other"];
	var categoryInput = document.getElementById("category-selector").options[document.getElementById("category-selector").selectedIndex].text;
	console.log('inside UpdateEventTable');
	reDate = rearrangeDate(date);
	var dataString = "eventDate=" + encodeURIComponent(reDate) + "&categoryInput=" + encodeURIComponent(categoryInput) + "&token=" + encodeURIComponent(token);

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "getEvent.php", true);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.addEventListener("load", function (event) {
            	console.log(dataString);
            	console.log(event);
                var data = JSON.parse(event.target.responseText);
                console.log(data.getEventSuccess);
                console.log(data.dataCollected);
                if (data.getEventSuccess) {
                	if (data.dataCollected) {
    					for (var k=0; k < data.events.length; k++){

                			var makebreak = document.createElement("br");
                			var datelist = date.split("-");
                			document.getElementById(parseInt(datelist[2])).appendChild(makebreak);
                	
                			//console.log(datelist);
                			var l = (data.events[k].eventTitle.clientHeight) + "px";
							let div = document.createElement("button");

							div.class = "eventClicked";
							div.id = data.events[k].eventId;
							console.log("this is div.class: "+div.class);
							console.log("this is div.id: "+div.id);
							div.style.width = l;
							div.style.height = "30px";
							div.style.background = eventColor[category.indexOf(data.events[k].eventCategory)];
							div.style.color = "white";
							var t = document.createTextNode(data.events[k].eventTitle);
							var datelist = date.split("-");
							div.appendChild(t);
							document.getElementById(parseInt(datelist[2])).appendChild(div);
				

						}
					}
                } else { 
                	alert("Error");
                }
            }, false);
    xmlHttp.send(dataString);
	
}

document.getElementById("category-selector").onchange = function () {
	console.log('category changed');

	var categoryInput = document.getElementById("category-selector").options[document.getElementById("category-selector").selectedIndex].text;
	let selectMonth = document.getElementById("month-selector");
	let selectYear = document.getElementById("year-selector");
	curYear = parseInt(selectYear.value);
	curMonth = parseInt(selectMonth.value);
	displayCalendar(curMonth,curYear,logincheck=true);
}




function showOptions() {
	console.log("showOptions called");
	var token = document.getElementById("token").value;
	var dataString = "token=" + encodeURIComponent(token);
	
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "showOptions.php", true);
            xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xmlHttp.addEventListener("load", function (event) {
            	var data = JSON.parse(event.target.responseText);
                if (data.showOptionsSuccess) {
                	if (data.dataCollected) {
    					for (var k=0; k < data.events.length; k++){
                			
                			var options = document.createElement("option");
							options.setAttribute('value',data.events[k].eventId.toString());
							var txt = document.createTextNode(data.events[k].eventId.toString());
							options.appendChild(txt);
							document.getElementById("eventId").appendChild(options);
				

						}
					}
                } else { 
                	alert("Error");
                }
            }, false);
    xmlHttp.send(dataString);
}



function rearrangeDate(date) {
	var newdate = "";
	var datelist = date.split("-");
	if ((datelist[1].length == 1) && (datelist[2].length == 1)) {
		newdate = datelist[0] + "-0" + datelist[1] + "-0" + datelist[2]; 
	} 
	if ((datelist[1].length == 1) && (datelist[2].length == 2)) {
		newdate = datelist[0] + "-0" + datelist[1] + "-" + datelist[2]; 
	}
	if ((datelist[1].length == 2) && (datelist[2].length == 1)) {
		newdate = datelist[0] + "-" + datelist[1] + "-0" + datelist[2]; 
	}
	if ((datelist[1].length == 2) && (datelist[2].length == 2)) {
		newdate = date;
	}

	return newdate;

}










