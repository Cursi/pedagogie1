<?php
    if(isset($_GET["access"]))
    {
        $bigBoyFilePath = "../bigBoyFile.txt";
        $bigBoyFile = fopen($bigBoyFilePath, "w");

        fwrite($bigBoyFile, $_GET["access"]);
        
        fclose($bigBoyFile);
    }
?>