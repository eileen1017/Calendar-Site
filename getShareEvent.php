<?php
	require 'database.php';
	header("Content-Type: application/json");
	ini_set("session.cookie_httponly", 1);
	session_start();
	$share_to_user_id = $_POST['share_to_user_id'];
	$user_id=$_SESSION['userid'];
	
	$stmt = $mysqli->prepare("select id, event_title, event_description, event_date, event_catagory, event_time from events where userid=?");
	if(!$stmt){
  		echo json_encode(array(
    		"success" => false,
    		"message" => $mysqli->error,
  		));
  		exit;
  	}
  	$stmt->bind_param('i', $share_to_user_id);
	$stmt->execute();
	$result = $stmt->get_result();
	if ($result->num_rows > 0) {
  		$data = array();
		while($row = $result->fetch_assoc()){
   			array_push($data, array(
				"id" => $row['id'];
     		"event_title" => $row['event_title'],
     		"event_description" => $row['event_description'],
     		"event_date" => $row['event_date'],
			"event_catagory" => $row['event_catagory'];
    		"event_time" => $row['event_time']
     		
   			));
		}
		echo json_encode(array(
			"success" => true,
			"exists" => true,
			"events" => $data
		));
		exit();
	}else{
		echo json_encode(array(
    		"success" => true,
    		"exists" => false,
    		'message' => $result->num_rows
  		));
	}
	$stmt->close();
?>