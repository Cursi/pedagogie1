<?php
    if(!isset($_SESSION)) session_start();

    if (isset($_SESSION["userName"])) echo 1;
    else echo 0;
?>
