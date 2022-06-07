<?php

include "../tools/connection.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function view_menu(){
    $conn = open_connection();
    $sql = "SELECT KoID, KoNama FROM koki";
    $result = $conn->query($sql);
    $book_data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $book_baris = [
                "KoID" => $row["KoID"], 
                "KoNama" => $row["KoNama"]
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