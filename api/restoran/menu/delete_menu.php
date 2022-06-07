<?php

include "../tools/connection.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function delete_menu(){
    $menu_id = $_POST["MID"];

    $conn = open_connection();

    $sql = "DELETE FROM menu WHERE MID = '$menu_id'";
    

    if ($conn->query($sql) === TRUE) {
        $response = ["status" => 1];
        echo json_encode($response);
    } 
    else {
        $response = ["status" => 0];
        echo json_encode($response);
    }

    $conn->close();
}

delete_menu();