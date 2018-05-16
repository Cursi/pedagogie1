$(document).ready(function()
{
//----------------------------------------------------------------------------------------------------------------------//
  $("#pageContainer").load("./pages/about.php");
  $("#sendButton").hide().show(500);
//----------------------------------------------------------------------------------------------------------------------//
  $.ajax({url: "./php/checkSession.php", success: function(isUserConnected)
  {
    console.log(isUserConnected);
    if(isUserConnected == 0) $("#loginWrapper").addClass("active");
  }});
//----------------------------------------------------------------------------------------------------------------------//
  $(".leftHeader").click(function()
  {
    location.reload();
  });
//----------------------------------------------------------------------------------------------------------------------//
  $(".fa-home").click(function()
  {
    $("#pageContainer").load("./pages/about.php",);
  });

  $(".fa-eye").click(function()
  {
    console.log("describe");

    $("#pageContainer").load("./pages/describe.php", function()
    {
      $(".owl-carousel").owlCarousel(
        {
          autoWidth: true,
          navigation : true
        });

      $("#selectedImage").attr("src", $(".thumbnail")[0].src);

      $(".thumbnail").click(function()
      {
        $("#selectedImage").attr("src", this.src);
      });
    });
  });

  $(".fa-american-sign-language-interpreting").click(function()
  {
    console.log("classify");

    $("#pageContainer").load("./pages/test.html");
  });

  $(".fa-chart-pie").click(function()
  {
    console.log("see results");
  });

  $(".fa-star").click(function()
  {
    console.log("give feedback");
  });
//----------------------------------------------------------------------------------------------------------------------//
});
