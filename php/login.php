<?php
    if(isset($_POST["userName"]))
    {
      if(!isset($_SESSION)) session_start();
      $_SESSION["userName"] = $_POST["userName"];

      header('Location: ../');
    }
?>
