<?php
require 'database.php';

header("Content_Type:application/json",'Accept:application/json');

$json_str=file_get_contents("php://input");
$json_obj=json_decode($json_str,true);

$Username=$json_obj['username'];
$Password=$json_obj['password'];

$find=false;
$match=false;

$stmt=$mysqli->prepare("Select username from userinfo");
if(!$stmt){
    printf("Query Prep Failed:%s\n",$mysqli->error);
    exit;
}

$stmt->execute();

$stmt->bind_result($username);

while($stmt->fetch()){
    if($Username==htmlspecialchars($username)){
        $find=true;
    }
}

$stmt->close();

if($find){
    $stmt=$mysqli->prepare("select userid, password from userinfo where username=?");
    if(!$stmt){
        printf("Query Prep Failed:%s\n",$mysqli->error);
        exit;
    }
    $stmt->bind_param('s',$Username);
    
    $stmt->execute();

    $stmt->bind_result($userid, $password);
    $stmt->fetch();

    if (password_verify($Password,$password)) {
        session_start();
        $_SESSION['username']=$Username;
        $_SESSION['token']=bin2hex(openssl_random_pseudo_bytes(32));
        $_SESSION['userid'] = $userid;
    
        echo json_encode(array("success"=>true,"message"=>"You have logged in", "username" => $_SESSION['username'], "token" =>$_SESSION['token'], "userid" => $_SESSION['userid']));
        exit;
    } else {
        echo json_encode(array("success" => false,"message" => "Incorrect Username or Password."));
        exit;
    }
} else {
    echo json_encode(array("success"=>false, "message"=>"Incorrect Username or Password."));
    exit;
}


?>