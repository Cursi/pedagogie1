<?php
    if(!isset($_SESSION)) session_start();

    $db = new mysqli('localhost', 'root', '', 'pedagogie1');
    if ($db->connect_error) die('Could not connect to database (' . $db->connect_errno . ') ' . $db->connect_error);
    $db->set_charset("utf8");
?>
