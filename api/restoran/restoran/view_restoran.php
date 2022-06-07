<?php

include "../tools/connection.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function view_restoran(){
    $page = 1;
    $max_item = 10;

    $item = $page * $max_item;

    $conn = open_connection();

    $sql = "SELECT * FROM restoran";
    $result = $conn->query($sql);

    $book_data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $book_baris = [
                "id" => $row["RID"], 
                "name" => $row["RNama"],
                "jam_buka" => $row["RJamBuka"],
                "durasi_hari_biasa" => $row["ROperasiBiasa"],
                "durasi_hari_libur" => $row["ROperasiLibur"],
            ];
            array_push($book_data, $book_baris);
        }
        echo json_encode($book_data);
    }
    else {
        $response = ["status" => "no r"];
        echo json_encode($response);
    }

    $conn->close();
}

view_restoran();