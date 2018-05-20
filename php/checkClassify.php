<?php
    require_once("connection.php");

    $result = mysqli_query($db, "SELECT result from data_table WHERE username='". $_SESSION["userName"] . "'");
    $classifyExists = $result->fetch_row()[0];

    echo $classifyExists;

    mysqli_close($db);
?>