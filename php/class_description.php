<?php
include 'conn.php';

$class_id = $_GET['class_id'];
$query="SELECT class_description from class where class_id =".$class_id;
$result = $conn->query($query);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc())
    {
      $array = array(
        "class_description"=>$row["class_description"],
      );
    }
}
header('content-type: application/json; charset=utf-8');
echo $_GET['callback'] . '(' . json_encode($array ). ')';
?>
