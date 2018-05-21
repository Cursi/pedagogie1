<?php
    require_once("connection.php");

    if (isset($_POST["result"]))
    {
      $result = mysqli_query($db, "SELECT COUNT(username) from data_table WHERE username='". $_SESSION["userName"] . "'");
      $userExists = $result->fetch_row()[0];

      if($userExists == "1") mysqli_query($db, "UPDATE data_table SET result='" . $_POST["result"] . "' WHERE username='" . $_SESSION["userName"] . "'");
    }

    mysqli_close($db);
?>
