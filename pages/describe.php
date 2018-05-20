<?php 
    require_once("../php/getCarousel.php");
?>

<img id="selectedImage" class="skinnyBorder" src="" alt="">

<?php
    $images = glob("../data/*.*");

    for($i=0; $i<count($images); $i++)
    {
      echo '<input oninput="CheckDescriptionInputs();" class="descriptionInput skinnyBorder" type="text" name="' . $i . '" placeholder="Your description..." required>' . "\n";
    }
?>