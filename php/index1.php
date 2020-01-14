<?php

include "conn.php";

$arr = Array();

$rulsut = $conn->query("SELECT * FROM gree");

for($i=0;$i<$rulsut->num_rows;$i++){
    $arr[$i]=$rulsut->fetch_assoc();
}
echo json_encode($arr);