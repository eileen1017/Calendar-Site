<?php
require 'database.php';
header("Content-Type: application/json");

ini_set("session.cookie_httponly", 1);

session_start();

if (!isset($_SESSION['username'])){
   echo json_encode(array("deleteEventSuccess" => false));
   exit;
 } else {

  $username = $_SESSION['username'];
  $userid = $_SESSION['userid'];
 }


if (!hash_equals($_SESSION['token'],$_POST['token'])){
	echo json_encode(array("deleteEventSuccess" => false, "message" => "Something wrong!"));
  	exit;
}

$eventId = $_POST['eventId'];


if (count($_POST)) {
    $stmt = $mysqli->prepare("DELETE FROM events WHERE id=? and userid=?");

	if (!$stmt) {
	printf("Query Prep Failed: %s\n", $mysqli->error);
	exit; }

    $stmt->bind_param('ii',$eventId, $userid);
	$stmt->execute();
	
	$stmt->close();
	
	echo json_encode(array("deleteEventSuccess"=>true,"message"=>"You have successfully deleted an event."));
	exit();
}
?>