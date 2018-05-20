<?php
  require_once("connection.php");

  if (isset($_POST["description"]))
  {
    $result = mysqli_query($db, "SELECT COUNT(username) from data_table WHERE username='". $_SESSION["userName"] . "'");
    $userExists = $result->fetch_row()[0];

    $description = mysqli_real_escape_string($db, $_POST["description"]);

    if($userExists == "0") mysqli_query($db, "INSERT INTO data_table (username,description) VALUES ('" . $_SESSION["userName"] . "', '" . $description . "')");
    else mysqli_query($db, "UPDATE data_table SET description='" . $description . "' WHERE username='" . $_SESSION["userName"] . "'");
  }

  mysqli_close($db);
?>
