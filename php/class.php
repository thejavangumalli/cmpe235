<?php
include 'conn.php';

$class_id = $_GET['class_id'];
$query="SELECT homework_max,labs_max,project_max,presentation_max,midterm_max,final_max,"
        ."homework_sf,labs_sf,project_sf,presentation_sf,midterm_sf,final_sf,"
        ."grade_a_min,grade_b_min,grade_c_min,grade_d_min "
        ."FROM class where class_id =".$class_id;
$result = $conn->query($query);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc())
  {
    $array = array(
                    "homework_max"=>$row["homework_max"],
                    "labs_max"=>$row["labs_max"],
                    "project_max"=>$row["project_max"],
                    "presentation_max"=>$row["presentation_max"],
                    "midterm_max"=>$row["midterm_max"],
                    "final_max"=>$row["final_max"],
                    "homework_sf"=>$row["homework_sf"],
                    "labs_sf"=>$row["labs_sf"],
                    "project_sf"=>$row["project_sf"],
                    "presentation_sf"=>$row["presentation_sf"],
                    "midterm_sf"=>$row["midterm_sf"],
                    "final_sf"=>$row["final_sf"],
                    "grade_a_min"=>$row["grade_a_min"],
                    "grade_b_min"=>$row["grade_b_min"],
                    "grade_c_min"=>$row["grade_c_min"],
                    "grade_d_min"=>$row["grade_d_min"]
                  );
  }
}
header('content-type: application/json; charset=utf-8');
echo $_GET['callback'] . '(' . json_encode($array ). ')';
?>
