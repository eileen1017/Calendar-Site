<?php

	session_start();
	session_destroy();
	echo json_encode(array("success" => true, "message"=>"You have logged out."));
	exit;



?>