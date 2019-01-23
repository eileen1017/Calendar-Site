<?php 

// reference: https://stackoverflow.com/questions/18753262/example-of-how-to-use-bind-result-vs-get-result

require 'database.php';
header("Content-Type: application/json");

ini_set("session.cookie_httponly", 1);

session_start();

if (!isset($_SESSION['username'])){
   echo json_encode(array("getEventSuccess" => false));
   exit;
 } else {

  $username = $_SESSION['username'];
  $userid = $_SESSION['userid'];
 }


if (!hash_equals($_SESSION['token'],$_POST['token'])){
	echo json_encode(array("getEventSuccess" => false));
  	exit;
}

$events = array();
$eventDate = $_POST['eventDate'];
$categoryInput = $_POST['categoryInput'];

if (count($_POST)) {

	if ($categoryInput == "All") {
		$stmt = $mysqli->prepare("SELECT id, event_title, event_category, event_time, event_date FROM events WHERE event_date=? and userid = ?");
		if (!$stmt) {
		echo json_encode(array(
		"getEventSuccess" => true,
		"dataCollected" => false
		));
		exit;
		}

		$stmt->bind_param('ss',$eventDate,$userid);

	}
	else {

		$stmt = $mysqli->prepare("SELECT id, event_title, event_category, event_time, event_date FROM events WHERE event_date=? and userid = ? and event_category = ?");
		if (!$stmt) {
		echo json_encode(array(
		"getEventSuccess" => true,
		"dataCollected" => false
		));
		exit;
		}
		$stmt->bind_param('sss',$eventDate,$userid,$categoryInput);
	}


	$stmt->execute();

	/* Get the result */
   	$result = $stmt->get_result();

   	/* Get the number of rows */
   	$num_of_rows = $result->num_rows;

	//$stmt->bind_result($eventId, $eventTitle, $eventCategory, $eventTime);


	if ($num_of_rows == 0) {

		echo json_encode(array(
		"getEventSuccess" => true,
		"dataCollected" => false
		));
		exit;

	} else {
		// $stmt->fetch()
		while ($row = $result->fetch_assoc()) {

			$single_event = array("eventId" => $row["id"], "eventTitle" => $row["event_title"], "eventCategory" => $row["event_category"], "eventTime" => $row["event_time"],"eventDate" => $row["event_date"]);
			array_push($events, $single_event);
		}
	echo json_encode(array(
		"getEventSuccess" => true,
		"dataCollected" => true,
		"events" => $events
	));
	}
	$stmt->close();
	exit;


}




?>