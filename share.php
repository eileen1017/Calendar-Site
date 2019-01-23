<?php
	require 'database.php';
	header("Content-Type: application/json");
	ini_set("session.cookie_httponly", 1);
	
	session_start();
	date_default_timezone_set('America/Chicago');
	
	$share_to_user = (String)$_POST['share_to_user'];
	$userid = $_SESSION["userid"];
	//check if user exists
	$stmt=$mysqli->prepare("SELECT COUNT(*),user_id FROM users WHERE username=?");
	if(!$stmt){
		echo json_encode(array(
			"success" => false
		));
		printf("1 Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	$stmt->bind_param('s', $share_to_user);
	$stmt->execute();
	$stmt->bind_result($count, $share_to_user_id);
	$stmt->fetch();
	$stmt->close();
	if($count){
	
		$stmt=$mysqli->prepare("insert into shares (userid, share_to_user_id) values (?, ?)");
		if(!$stmt){
			printf("2 Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param("ii", $userid, $share_to_user_id);
		$stmt->execute();
		$stmt->close();
		echo json_encode(array(
			"success" => true,
		));
	}else{
		echo json_encode(array(
			"success" => false,
			"message" => "User does not exist"
		));
		exit;
	}
?>