<?php

    include 'tools/connection.php';

    $conn = open_connection();

    // $sql = "INSERT INTO MyGuests (firstname, lastname, email)
    // VALUES ('John', 'Doe', 'john@example.com')";

    $nama = $_POST["nama"];

    // if ($conn->query($sql) === TRUE) {
    // echo "New record created successfully";
    // } else {
    // echo "Error: " . $sql . "<br>" . $conn->error;
    // }

    $conn->close();

?>