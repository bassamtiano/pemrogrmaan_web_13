<?php

include "../tools/connection.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function update_menu(){
    $menu_id = $_POST["MID"];

    $restoran = 1;
    $nama_menu = $_POST["MNama"];
    $harga_menu = $_POST["MHarga"];
    $status_menu = $_POST["MStatus"];
    $koki = $_POST["KoID"];

    $conn = open_connection();

    if(!empty($_FILES["picture-menu"]["name"])) {
        $uploaddir = "images/";
        $file_name = str_replace(" ", "_", strtolower($nama_menu));
        $ext = explode(".", $_FILES["picture-menu"]["name"])[1];

        $file_name  = $file_name . "." . $ext;
        $uploadfile = $uploaddir . $file_name;

        if (move_uploaded_file($_FILES['picture-menu']['tmp_name'], $uploadfile)) {
            echo "upload image";
            $sql = "UPDATE menu SET
                RID = $restoran,
                MPicture = '$file_name',
                MNama = '$nama_menu',
                MHarga = '$harga_menu',
                MStatus = $status_menu,
                KoID = $koki
            WHERE MID = $menu_id";
        } 
        else {
            $response = ["status" => 0];
        }
    } 
    else {
        echo "no upload image";
        $sql = "UPDATE menu SET
            RID = $restoran,
            MNama = '$nama_menu',
            MHarga = '$harga_menu',
            MStatus = $status_menu,
            KoID = $koki
        WHERE MID = $menu_id";
    }

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

update_menu();