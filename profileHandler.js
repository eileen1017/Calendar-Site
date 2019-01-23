function registerAjax() {
    const username=document.getElementById("username").value;
    const password=document.getElementById("pwd").value;
    const data={'username':username,'password':password};
    fetch("register_ajax.php",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type":"application/json"}
        })
        .then(response => response.json())
        .then(function(data){
            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message);
            }

        });
        
}

function loginAjax(){
    const username=document.getElementById("username").value;
    const password=document.getElementById("pwd").value;
    const data={'username':username,'password':password};
    fetch("login_ajax.php",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content_Type":"application/json"}
        })
        .then(response => response.json())
        .then(function(data){
            // console.log("this is data.success:"+data.success);
            if (data.success) {
                console.log("loginAjax called");
                document.getElementById('usr-profile').style.display = 'none';
                document.getElementById('category-selector-class').style.display = 'block';
                document.getElementById('shareCalendar').style.display = 'block';  
                document.getElementById('EventHandler').style.display = 'block';
                document.getElementById('loggedin').style.display = "block";
                document.getElementById('logoutbtn').style.display = "block";
                document.getElementById('profilename').innerHTML = "Hello, " + data.username;
                // console.log("This is data.token"+data.token);
                var token = document.getElementById('token');
                token.value = data.token;
                // console.log(document.getElementById('token').value);
                // console.log(document.getElementById('usrid').value);
                let today = new Date();
                let curMonth = today.getMonth();
                let curYear = today.getFullYear();
                displayCalendar(curMonth,curYear,logincheck = true);
                alert(data.message);
                showOptions();

            } else {
                alert(data.message);
            }
        });
}


function logoutAjax(){
    const username=document.getElementById("username").value;
    const password=document.getElementById("pwd").value;
    const data={'username':username,'password':password};
    fetch("logout_ajax.php",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content_Type":"application/json"}
        })
        .then(response => response.json())
        .then(function(data){
            console.log("this is data.success:"+data.success);
            if (data.success) {
                document.getElementById('usr-profile').style.display = 'block';
                document.getElementById('category-selector-class').style.display = 'none'; 
                document.getElementById('shareCalendar').style.display = 'none';  
                document.getElementById('EventHandler').style.display = 'none';
                document.getElementById('loggedin').style.display = "none";
                document.getElementById('logoutbtn').style.display = "none";
                document.getElementById("username").value = "";
                document.getElementById("pwd").value = "";
                displayCalendar(curMonth,curYear,logincheck = false);
                alert(data.message);

            }
        });
}



document.getElementById("signupbtn").onclick = function() {
    registerAjax();
}

document.getElementById("loginbtn").onclick = function() {
    loginAjax();
}

document.getElementById("logoutbtn").onclick = function() {
    logoutAjax();
}

