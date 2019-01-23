<?php
// require 'database.php';
// header("Content-Type: application/json");

// ini_set("session.cookie_httponly", 1);
// session_start();

// if (!isset($_SESSION['username'])){
//    echo json_encode(array("editEventSuccess" => false));
//    exit;
//  } else {

//   $username = $_SESSION['username'];
//   $userid = $_SESSION['userid'];
//  }


// if (!hash_equals($_SESSION['token'],$_POST['token'])){
// 	echo json_encode(array("editEventSuccess" => false));
//   	exit;
// }

// $eventDate = $_POST['eventDate'];
// $title = $mysqli->real_escape_string($_POST['eventTitle']);
// $time = $_POST['eventTime'];
// $category = $_POST['eventCategory'];
// $description = $mysqli->real_escape_string($_POST['eventDescription']);

// $eventId = $_POST['eventId'];

// if (count($_POST)) {
// 	date_default_timezone_set('America/Chicago');
// 	$time = date("H:i:s",strtotime($time));
//  	$stmt = $mysqli->prepare("UPDATE events SET event_title=?, event_description=?, event_time=?, event_category=?, event_date=? WHERE id=? and userid=?");

// 	if (!$stmt) {
// 	printf("Query Prep Failed: %s\n", $mysqli->error);
// 	exit; }

// 	$stmt->execute();
// 	$stmt->bind_param('sssssss',$title,$description,$time,$category,$eventDate,$eventId,$userid);
// 	$stmt->close();
	
// 	echo json_encode(array(
// 		"editEventSuccess" => true,
// 	));
// 	exit();
// }


require 'database.php';
header("Content-Type: application/json");

ini_set("session.cookie_httponly", 1);
session_start();

if (!isset($_SESSION['username'])){
   echo json_encode(array("editEventSuccess" => false));
   exit;
 } else {

  $username = $_SESSION['username'];
  $userid = $_SESSION['userid'];
 }


if (!hash_equals($_SESSION['token'],$_POST['token'])){
	echo json_encode(array("editEventSuccess" => false));
  	exit;
}

$eventDate = $_POST['eventDate'];
$title = $mysqli->real_escape_string($_POST['eventTitle']);
$time = $_POST['eventTime'];
$category = $_POST['eventCategory'];
$description = $mysqli->real_escape_string($_POST['eventDescription']);

$eventId = $_POST['eventId'];

if (count($_POST)) {
	date_default_timezone_set('America/Chicago');
	$time = date("H:i:s",strtotime($time));
 $stmt = $mysqli->prepare("UPDATE events SET event_title=?, event_description=?, event_time=?, event_category=?, event_date=? WHERE id=? and userid=?");

 	$stmt->bind_param('sssssii',$title,$description,$time,$category,$eventDate,$eventId,$userid);
	$stmt->execute();
	$stmt->close();

	if (!$stmt) {
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit; }
	
	echo json_encode(array(
		"editEventSuccess" => true,
	));
	exit();
}


?>