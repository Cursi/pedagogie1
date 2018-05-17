<?php
  $images = glob("../data/*.*");

  echo '<div class="outsetContainer owl-carousel">';
  for ($i=0; $i<count($images); $i++)
  {
    $images[$i] = substr($images[$i], 1);
    echo '<img class="thumbnail" src="' . $images[$i] . '" alt="random image" name="'. $i . '">' . "\n";
  }
  echo '</div>';

  for($i=0; $i<count($images); $i++)
  {
    echo '<input oninput="CheckDescriptionInputs();" class="descriptionInput skinnyBorder" type="text" name="' . $i . '" placeholder="Your description..." required>' . "\n";
  }
?>
