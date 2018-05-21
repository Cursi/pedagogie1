<?php
    require_once("connection.php");

    $result = mysqli_query($db, "SELECT result from data_table");

    $results = (array)mysqli_fetch_all($result, MYSQLI_ASSOC);
    $numberOfValidResults = 0;

    foreach($results as &$result)
    {
      if(!empty($result["result"])) $numberOfValidResults++;
    }

    $result = mysqli_query($db, "SELECT COUNT(result) from data_table");
    $numberOfResults = (int)$result->fetch_row()[0];

    if($numberOfResults === $numberOfValidResults) echo 1;
    else echo 0;

    mysqli_close($db);
?>
