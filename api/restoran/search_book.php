<?php

    include 'tools/connection.php';
    error_reporting(E_ERROR | E_PARSE);
    $conn = open_connection();

    $page = $_GET['page'];
    $max_item = $_GET['max_item'];
    $keyword = $_GET['key'];
    $value = $_GET['value'];

    $item = $page * $max_item;

    $sql = "SELECT * FROM koleksi WHERE $page='$value' LIMIT $item, $max_item";
    $result = $conn->query($sql);

    $book_data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $book_baris = ["id" => $row["id"], "name" => $row["name"]];
            array_push($book_data, $book_baris);
        }
        echo json_encode($book_data);
    }
    else {
        $response = ["status" => "no data"];
        echo json_encode($response);
    }

    $conn->close();