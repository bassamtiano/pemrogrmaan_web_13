<?php

include "../tools/connection.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function add_menu(){
    $restoran = 1;
    $nama_menu = $_POST["MNama"];
    $harga_menu = $_POST["MHarga"];
    $status_menu = $_POST["MStatus"];
    $koki = $_POST["KoID"];

    $conn = open_connection();

    $uploaddir = "images/";
    $file_name = str_replace(" ", "_", strtolower($nama_menu));
    $ext = explode(".", $_FILES["picture-menu"]["name"])[1];

    $file_name  = $file_name . "." . $ext;
    $uploadfile = $uploaddir . $file_name;

    if (move_uploaded_file($_FILES['picture-menu']['tmp_name'], $uploadfile)) {
        $sql = "INSERT INTO menu(RID, MPicture, MNama, MHarga, MStatus, KoID)
        VALUES (
            $restoran, '$file_name', '$nama_menu', $harga_menu, $status_menu, $koki
        )";

        if ($conn->query($sql) === TRUE) {
            $response = ["status" => 1];
        } 
        else {
            $response = ["status" => 0];
        }
        
        $conn->close();
    } 
    else {
        $response = ["status" => 0];
    }

    echo json_encode($response);
}

add_menu();