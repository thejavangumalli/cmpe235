<?php
include 'conn.php';
$class_id=$_GET['class_id'];
$student_id=$_GET['student_id'];
$homework_points = $_GET['homework_points'];
$labs_points = $_GET['labs_points'];
$project_points = $_GET['project_points'];
$pres_points = $_GET['pres_points'];
$mid_points = $_GET['mid_points'];
$final_points = $_GET['final_points'];
$myfile = fopen("file.txt", w);
fwrite($myfile,$project_points);
fwrite($myfile,$pres_points);
$query="UPDATE student_grade SET homeworks=".$homework_points
		.",labs=".$labs_points
      	.",project=".$project_points
      	.",presentation=".$pres_points
      	.",midterm=".$mid_points
      	.",final=".$final_points
      	." where class_id =".$class_id
      	." and student_id =".$student_id ;
$result = $conn->query($query);
fwrite($myfile,$query);
fwrite($myfile,$result);
fclose($myfile);
if($result>0)
{
  $array = array(
    msg=>"true"
  );
}
else
{
  $array = array(
    msg=>"false"
  );
}
header('content-type: application/json; charset=utf-8');
echo $_GET['callback'] . '(' . json_encode($array ). ')';
?>
