<?php
    require_once("connection.php");

    $result = mysqli_query($db, "SELECT COUNT(description) from data_table WHERE username='". $_SESSION["userName"] . "'");
    $descriptionExists = $result->fetch_row()[0];

    echo $descriptionExists;

    mysqli_close($db);
?>