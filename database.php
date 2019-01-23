<?php

$mysqli = new mysqli("localhost", "lilin1", "lilin1017","module5");

if ($mysqli->connect_errno) {
	printf("Connection failed: %s\n", $mysqli->connect_error);
	exit;
}

?>