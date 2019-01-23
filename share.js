function shareCalendar(share_to_user){
  var dataString = "share_to_user=" + encodeURIComponent(share_to_user);

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('POST', 'share.php', true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load", function(event){
  	console.log(event.target.responseText);
  	var jsonData = JSON.parse(event.target.responseText);
  	console.log(jsonData);
  }, false);
  xmlHttp.send(dataString);
}

function loadSharedCalendars(){
	
	var xmlHttp = new XMLHttpRequest();
  	xmlHttp.open('POST', 'getShareUser.php', true);
  	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  	xmlHttp.addEventListener("load", function(event){
  		console.log(event.target.responseText);
  		var jsonData = JSON.parse(event.target.responseText);
  		if(jsonData.success){
  			for(var i=0; i<jsonData.event.length; i++){
  				console.log(jsonData.event[i].id);
  				var dataString = "share_to_user_id=" + encodeURIComponent(jsonData.event[i].id);
  				var xmlHttp_events = new XMLHttpRequest();
  				xmlHttp_events.open('POST', 'getShareEvents.php', true);
  				xmlHttp_events.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  				xmlHttp_events.addEventListener("load",function(Event1){
  					var JsonData1 = JSON.parse(Event1.target.responseText);
  					if(JsonData1.success){
              	for (var k=0; k < JsonData1.events.length; k++){
                			var makebreak = document.createElement("br");
                			//console.log(datelist);
                			var l = (data.events[k].eventTitle.clientHeight) + "px";
							let div = document.createElement("div");
							div.style.width = l;
							div.style.height = "20px";
							div.style.background = eventColor[category.indexOf(data.events[k].eventCategory)];
							div.style.color = "white";
							div.innerHTML = data.events[k].eventTitle;
							var datelist = date.split("-");
							document.getElementById(parseInt(datelist[2])).appendChild(div);
                }
  					}
            else { 
                	alert("Error");
                }
  				},false);
  				xmlHttp_events.send(dataString);
  			}
  		}
  	}, false);
	
	xmlHttp.send(null);
}

