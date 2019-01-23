<?php
require 'database.php';

header("Content_Type:application/json",'Accept:application/json');

$json_str=file_get_contents("php://input");
$json_obj=json_decode($json_str,true);

$Username=$json_obj['username'];
$Password=$json_obj['password'];

$find=false;

$stmt=$mysqli->prepare("Select username, password from userinfo");
if(!$stmt){
    printf("Query Prep Failed:%s\n",$mysqli->error);
    exit;
}

$stmt->execute();

$result=$stmt->get_result();

while($row=$result->fetch_assoc()){
    if($Username==htmlspecialchars($row["username"])){
        $find=true;
    }
}

$stmt->close();

if($find){
    echo json_encode(array(
        "success"=>false,
        "message"=>"Username already existed"
    ));
    exit;
}else{

    $stmt=$mysqli->prepare("insert into userinfo (username, password) values (?,?)");
    if(!$stmt){
        printf("Query Prep Failed:%s\n",$mysqli->error);
        exit;
    }

    session_start();
    ini_set("session.cookie_httponly", 1);
    $_SESSION['username'] = $Username;
    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(64));

    $stmt->bind_param('ss', $Username, password_hash($Password, PASSWORD_DEFAULT));

    $stmt->execute();

    $stmt->close();
    
    echo json_encode(array(
                           "success"=>true,
                           "message" => "You have successfully created an account. Sign in now.",
                           "username" => $_SESSION['username'],
                           "token" => $_SESSION['token']
                       ));
    exit;
    
}

?>