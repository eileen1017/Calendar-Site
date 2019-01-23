<?php
	require 'database.php';
	header("Content-Type: application/json");
	ini_set("session.cookie_httponly", 1);
	session_start();
	date_default_timezone_set('America/Chicago');
	$share_to_user_id=$_SESSION['userid'];
	$stmt=$mysqli->prepare("SELECT userid FROM shares WHERE share_to_user_id=?");
	if(!$stmt){
		echo json_encode(array(
			"success" => false
		));
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	$stmt->bind_param('i', $share_to_user_id);
	$stmt->execute();
	$result = $stmt->get_result();
	if ($result->num_rows > 0) {
  		$list = array();
		while($row = $result->fetch_assoc()){
   			array_push($list, array(
		     "id" => $row['user_id']
   			));
		}
		echo json_encode(array(
		  "success" => true,
		  "exists" => true,
		  "shared_people" => $list
		));
		exit;
	}else{
		echo json_encode(array(
			"success" => false,
			"message" => "No shared calendar"
		));
		exit;
	}
	$stmt->close();
?>