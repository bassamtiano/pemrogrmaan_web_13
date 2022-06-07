<?php

include "../tools/connection.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function view_menu() {
    $id = $_GET["id"];

    $conn = open_connection();

    $sql = "SELECT 
        MID,
        RID,
        MPicture,
        MNama,
        MHarga,
        MStatus,
        KoID
    FROM menu 
    WHERE MID ='$id'";

    $result = $conn->query($sql);

    $book_data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            

            $book_baris = [
                "MID" => $row["MID"], 
                "RID" => $row["RID"],
                "MPicture" => $row["MPicture"],
                "MNama" => $row["MNama"],
                "MHarga" => $row["MHarga"],
                "MStatus" => $row["MStatus"],
                "KoID" => $row["KoID"],
            ];
            array_push($book_data, $book_baris);
        }
        echo json_encode($book_data);
    }
    else {
        $response = ["status" => "no data"];
        echo json_encode($response);
    }

    $conn->close();
}

view_menu();