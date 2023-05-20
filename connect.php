<?php
    // Подключение к бд
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "products";
    $connection = new mysqli($servername, $username, $password, $dbname);

    if ($connection->connect_error) {
        die("Connection failed" . $connection->error); 
    }


?>