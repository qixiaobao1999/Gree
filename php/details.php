<?php

include "conn.php";

if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    $relust = $conn->query("SELECT * FROM gree WHERE sid=$sid");
    echo json_encode($relust->fetch_assoc());
}else{
    exit("非法操作");
}