<?php
$servername = "mysql";
$username = "theja";
$password = "rockerz";
$dbname = "cmpe235";
$conn = new mysqli($servername, $username, $password, $dbname);

$username = $_GET['username'];
$password = $_GET['password'];
$query="SELECT id,firstname,lastname,phone,email,type from user where id =".$username." and password=".$password;
$result = $conn->query($query);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $array = array(
                              "firstname"=>$row["firstname"],
                               "lastname"=>$row["lastname"],
                               "email"=>$row["email"],
                               "phone"=>$row["phone"],
                               "type"=>$row["type"]
                              );
    }
}
else
{
     $array = array(
                            "error"=>"Invalid Username/Password combination"
                            );
}
header('content-type: application/json; charset=utf-8');
echo $_GET['callback'] . '(' . json_encode($array ). ')';
?>
