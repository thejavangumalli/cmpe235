<?php
include 'conn.php';
$class_id=$_GET['class_id'];
$homework_max = $_GET['max_homework_points'];
$labs_max = $_GET['max_labs_points'];
$project_max = $_GET['max_project_points'];
$presentation_max = $_GET['max_present_points'];
$midterm_max = $_GET['max_mid_points'];
$final_max = $_GET['max_final_points'];
$homework_sf = $_GET['max_homework_sf'];
$labs_sf = $_GET['max_labs_sf'];
$project_sf = $_GET['max_project_sf'];
$presentation_sf = $_GET['max_present_sf'];
$midterm_sf = $_GET['max_mid_sf'];
$final_sf = $_GET['max_final_sf'];
$grade_a_min = $_GET['min_a_grade'];
$grade_b_min = $_GET['min_b_grade'];
$grade_c_min = $_GET['min_c_grade'];
$grade_d_min = $_GET['min_d_grade'];

$query="UPDATE class SET homework_max=".$homework_max.",labs_max=".$labs_max
      .",project_max=".$project_max.",presentation_max=".$presentation_max
      .",midterm_max=".$midterm_max.",final_max=".$final_max
      .",homework_sf=".$homework_sf.",labs_sf=".$labs_sf
      .",project_sf=".$project_sf.",presentation_sf=".$presentation_sf
      .",midterm_sf=".$midterm_sf.",final_sf=".$final_sf
      .",grade_a_min=".$grade_a_min.",grade_b_min=".$grade_b_min
      .",grade_c_min=".$grade_c_min.",grade_d_min=".$grade_d_min
      ." where class_id =".$class_id;
$result = $conn->query($query);
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
