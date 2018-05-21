<!DOCTYPE html>

<html lang="en" dir="ltr">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">

    <title>Human vs A.I.</title>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
		integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">

    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">

    <link rel="stylesheet" type="text/css" href="css/chartist.min.css">

    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/radio.css">
    <link rel="stylesheet" href="css/master.css">
  </head>

  <body>

    <header class="noselect">
      <div class="leftHeader flexedContainer">
        <img class="appLogo" src="img/logo.png" alt="logo">
        <div class="appName">Human vs A.I.</div>
      </div>

      <i id="sendButton" class="fas fa-check-circle uiElement"></i>
    </header>

    <div id="pageContainer"></div>

    <div id="loginWrapper">
      <form id="loginContainer" class="form" method="post" action="php/login.php">
          <i class="fas fa-user-astronaut"></i>
          <label class="loginLabel" for="userName">Username</label>
          <input id="userName" type="text" name="userName" placeholder="Your username..." required>
          <input type="submit" value="Join">
      </form>
    </div>

    <footer class="noselect">
			<i class="fas fa-home uiElement"></i>
      <i class="fas fa-eye uiElement"></i>
			<i class="fas fa-american-sign-language-interpreting uiElement"></i>
      <i class="fas fa-chart-pie uiElement"></i>
		</footer>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

    <script src="js/owl.carousel.min.js"></script>
    <script src="js/chartist.min.js"></script>

    <script type="text/javascript" src="js/master.js"></script>
  </body>

</html>
