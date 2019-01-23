<?php 

// reference: https://stackoverflow.com/questions/18753262/example-of-how-to-use-bind-result-vs-get-result

require 'database.php';
header("Content-Type: application/json");

ini_set("session.cookie_httponly", 1);

session_start();

if (!isset($_SESSION['username'])){
   echo json_encode(array("showOptionsSuccess" => false));
   exit;
 } else {

  $username = $_SESSION['username'];
  $userid = $_SESSION['userid'];
 }


if (!hash_equals($_SESSION['token'],$_POST['token'])){
	echo json_encode(array("showOptionsSuccess" => false));
  	exit;
}



if (count($_POST)) {
	$events = array();

	$stmt = $mysqli->prepare("SELECT id FROM events WHERE userid = ?");

	if (!$stmt) {
		echo json_encode(array(
		"showOptionsSuccess" => false,
		));
		exit;
	}

	$stmt->bind_param('i', $userid);
	$stmt->execute();
	/* Get the result */
   	$result = $stmt->get_result();

   	/* Get the number of rows */
   	$num_of_rows = $result->num_rows;

	//$stmt->bind_result($eventId, $eventTitle, $eventCategory, $eventTime);


	if ($num_of_rows == 0) {

		echo json_encode(array(
		"showOptionsSuccess" => true,
		"dataCollected" => false
		));

	} else {
		// $stmt->fetch()
		while ($row = $result->fetch_assoc()) {

			$single_event = array("eventId" => $row["id"]);
			array_push($events, $single_event);
		}
	echo json_encode(array(
		"showOptionsSuccess" => true,
		"dataCollected" => true,
		"events" => $events
	));
	}
	$stmt->close();
	exit;


}




?>