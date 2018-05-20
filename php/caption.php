<?php
  function GetImageCaption($imageUrl)
  {
      $ch = curl_init('https://captionbot.azurewebsites.net/api/messages');

      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('Type' => 'CaptionRequest', 'Content' => $imageUrl)));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

      $response = curl_exec($ch);
      curl_close($ch);
      $response = json_decode($response);

      return $response;
  }

  if (isset($_POST["imageURL"]))
  {
    $aiDescription = getImageCaption($_POST["imageURL"]);
  }
?>
