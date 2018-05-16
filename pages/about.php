<div class="outsetContainer aboutContainer">
  <img class="backgroundImage" src="img/background.png" alt="background">
  <div class="aboutTitle">Image description classification <strong>experiment</strong></div>
  <br>
  <div class="aboutDescription">
    In the past few years, technology has advanced so quickly in any field,
    but by far the most interesting one is <strong>Artificial Intelligence</strong>.
    <br><br>
    The aim of this <strong>experiment</strong> is to see how well can humans
    separete human image description from the artificial ones.
    <br><br>
    The rules are simple:
    <br>
    <div style="margin-left:15px; font-family:appleRegular">
      - Your descriptions must be written in english
      <br>
      - Start descriptions with: "I think it's"
      <br>
      - End descriptions with a closing "."
    </div>
    <br>
    You are logged in as
      <strong><?php
        if(!isset($_SESSION)) session_start();
        echo $_SESSION["userName"];
      ?></strong>.
    <br>
    Do you wanna join? Feel free to jump into the <strong>next section</strong>...
  </div>
</div>
