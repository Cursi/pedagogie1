<?php
  $images = glob("../data/*.*");

  echo '<div class="outsetContainer owl-carousel">';
  for ($i=0; $i<count($images); $i++)
  {
    $images[$i] = substr($images[$i], 1);
    echo '<img class="thumbnail" src="' . $images[$i] . '" alt="random image">' . "\n";
  }
  echo '</div>';
?>
