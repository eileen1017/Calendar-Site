<?php 

require 'database.php';
header("Content-Type: application/json");

ini_set("session.cookie_httponly", 1);

session_start();

if (!isset($_SESSION['username'])){
   echo json_encode(array("addedEventSuccess" => false));
   exit;
 } else {

  $username = $_SESSION['username'];
  $userid = $_SESSION['userid'];
 }


if (!hash_equals($_SESSION['token'],$_POST['token'])){
	echo json_encode(array("addedEventSuccess" => false));
  	exit;
}

$title = $mysqli->real_escape_string($_POST['eventTitle']);
$date = $_POST['eventDate'];
$time = $_POST['eventTime'];
$category = $_POST['eventCategory'];
$description = $mysqli->real_escape_string($_POST['eventDescription']);

if (count($_POST)) {
	date_default_timezone_set('America/Chicago');
	$date = date("Y-m-d",strtotime($date));
	$time = date("H:i:s",strtotime($time));
	$stmt = $mysqli->prepare("INSERT into events (userid, event_title, event_description, event_date, event_time, event_category) values (?,?,?,?,?,?)");

	if (!$stmt) {
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit; }

	$stmt->bind_param('isssss',$userid,$title,$description,$date,$time,$category);
	$stmt->execute();
	$last_id = $stmt->insert_id;
	$stmt->close();

	echo json_encode(array(
		"addedEventSuccess" => true,
		"message" => "You have successfully added an event to your calendar.",
		"date" => $date,
		"eventId" => $last_id
	));
	exit();
}






 ?>