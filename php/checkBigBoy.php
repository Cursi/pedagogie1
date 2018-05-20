<?php 
    $bigBoyFilePath = "bigBoyFile.txt";
    $bigBoyFile = fopen($bigBoyFilePath, "r");

    echo fread($bigBoyFile, filesize($bigBoyFilePath));
    
    fclose($bigBoyFile);
?>