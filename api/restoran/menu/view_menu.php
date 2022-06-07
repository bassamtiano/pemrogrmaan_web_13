<?php

include "../tools/connection.php";
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function view_menu(){
    $page = 1;
    $max_item = 10;

    $item = $page * $max_item;

    $conn = open_connection();

    $sql = "SELECT 
        menu.MID as MID, 
        menu.MPicture as picture_menu,
        menu.MNama as nama_menu, 
        menu.MHarga as harga_menu,
        menu.MStatus as status_menu,
        restoran.RNama AS nama_restoran,
        koki.KoNama AS nama_koki
    FROM menu 
    JOIN restoran ON menu.RID=restoran.RID 
    JOIN koki ON menu.KoID = koki.KoID";

    $result = $conn->query($sql);

    $book_data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $book_baris = [
                "id" => $row["MID"], 
                "nama_menu" => $row["nama_menu"],
                "picture_menu" => $row["picture_menu"],
                "harga_menu" => $row["harga_menu"],
                "status_menu" => $row["status_menu"],
                "nama_restoran" => $row["nama_restoran"],
                "nama_koki" => $row["nama_koki"],
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