<?php 

// reference: https://stackoverflow.com/questions/18753262/example-of-how-to-use-bind-result-vs-get-result

require 'database.php';
header("Content-Type: application/json");

ini_set("session.cookie_httponly", 1);

session_start();

if (!isset($_SESSION['username'])){
   echo json_encode(array("getEventByIdSuccess" => false));
   exit;
 } else {

  $username = $_SESSION['username'];
  $userid = $_SESSION['userid'];
 }


if (!hash_equals($_SESSION['token'],$_POST['token'])){
	echo json_encode(array("getEventByIdSuccess" => false));
  	exit;
}

$eventId = $_POST['eventId'];


if (count($_POST)) {

	$stmt = $mysqli->prepare("SELECT event_title, event_category, event_time, event_description, event_date FROM events WHERE id = ? and userid = ?");

	if (!$stmt) {
		echo json_encode(array(
		"getEventByIdSuccess" => false,
		));
		exit;
	}

	$stmt->bind_param('ss',$eventId, $userid);
	$stmt->execute();


	$stmt->bind_result($eventTitle,$eventCategory,$eventTime,$eventDescription,$eventDate);


	$stmt->fetch();


	echo json_encode(array("getEventByIdSuccess" => true,"eventTitle" => $eventTitle,"eventCategory" => $eventCategory,"eventTime" => $eventTime,"eventDescription" => $eventDescription,"eventDate" => $eventDate));
	}
	$stmt->close();
	exit;






?>