<?php
include 'conn.php';
$username = $_GET['username'];
$password = $_GET['password'];
$query="SELECT id,firstname,lastname,phone,email,type from user where id =".$username." and password=".$password;
$result = $conn->query($query);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      if($row["type"] == 1)
      {
        $gradesQuery = "SELECT homeworks,labs,midterm,presentation,project,final from student_grade where student_id=".$username;
        $gradesResult = $conn->query($gradesQuery);
        while($gradesRow = $gradesResult->fetch_assoc())
        {
          $array = array(
                        "firstname"=>$row["firstname"],
                         "lastname"=>$row["lastname"],
                         "email"=>$row["email"],
                         "phone"=>$row["phone"],
                         "type"=>$row["type"],
                         "homeworks"=>$gradesRow["homeworks"],
                         "labs"=>$gradesRow["labs"],
                         "midterm"=>$gradesRow["midterm"],
                         "presentation"=>$gradesRow["presentation"],
                         "project"=>$gradesRow["project"],
                         "final"=>$gradesRow["final"]
                        );
        }
      }
      else
      {
        $array = array(
                        "firstname"=>$row["firstname"],
                        "lastname"=>$row["lastname"],
                        "email"=>$row["email"],
                        "phone"=>$row["phone"],
                        "type"=>$row["type"]
                      );
      }
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
