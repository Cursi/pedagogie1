//----------------------------------------------------------------------------------------------------------------------//
var regionID;

function GetJson()
{
  var json = [];

  switch(regionID)
  {
    case 1:
    {
      $(".descriptionInput").each(function()
      {
        var jsonObject =
        {
          "src": $(".thumbnail")[this.name].src,
          "description": this.value
        };

        json.push(jsonObject);
      });
      break;
    }
    case 2:
    {
      break;
    }
    case 4:
    {
      break;
    }
    default: break;
  }

  return JSON.stringify(json);
}

function CheckDescriptionInputs()
{
  if(AreFieldsFilled()) $("#sendButton").show(500);
  else $("#sendButton").hide();
}

function IsValidDescription(description)
{
  if(description && description.startsWith("I think it's") && description.endsWith(".")) return 1;
  else return 0;
}

function AreFieldsFilled()
{
  var areFieldsFilled = 1;

  switch(regionID)
  {
    case 1:
    {
      $(".descriptionInput").each(function()
      {
        if(!IsValidDescription(this.value)) areFieldsFilled = 0;
      });
      break;
    }
    case 2:
    {
      break;
    }
    case 4:
    {
      break;
    }
    default: break;
  }

  return areFieldsFilled;
}
//----------------------------------------------------------------------------------------------------------------------//
$(document).ready(function()
{
//----------------------------------------------------------------------------------------------------------------------//
  $("#pageContainer").load("./pages/about.php");
  regionID = 0;
  $("#sendButton").hide();
//----------------------------------------------------------------------------------------------------------------------//
  $.ajax({url: "./php/checkSession.php", success: function(isUserConnected)
  {
    if(isUserConnected == 0) $("#loginWrapper").addClass("active");
  }});
//----------------------------------------------------------------------------------------------------------------------//
  $(".leftHeader").click(function()
  {
    location.reload();
  });

  $(".uiElement").click(function()
  {
    $("#sendButton").hide();
  });

  $("#sendButton").click(function()
  {
    switch(regionID)
    {
      case 1:
      {
        var descriptionJSON = GetJson();

        $.post("./php/insertDescriptions.php", { description: descriptionJSON }, function(data)
        {
							console.log(data);
				});
        break;
      }
      case 2:
      {
        break;
      }
      case 4:
      {
        break;
      }
      default: break;
    }
  });
//----------------------------------------------------------------------------------------------------------------------//
  $(".fa-home").click(function()
  {
    regionID = 0;
    $("#pageContainer").load("./pages/about.php",);
  });

  $(".fa-eye").click(function()
  {
    regionID = 1;
    $("#pageContainer").load("./pages/describe.php", function()
    {
      $(".owl-carousel").owlCarousel(
        {
          autoWidth: true,
          navigation : true
        });

      $("#selectedImage").attr("src", $(".thumbnail")[0].src);
      $($(".descriptionInput")[0]).addClass("active");

      $(".thumbnail").click(function()
      {
        $("#selectedImage").attr("src", this.src);

        $(".descriptionInput").not($(".descriptionInput")[this.name]).removeClass("active");
        $($(".descriptionInput")[this.name]).addClass("active");
      });
    });
  });

  $(".fa-american-sign-language-interpreting").click(function()
  {
    console.log("classify");
  });

  $(".fa-chart-pie").click(function()
  {
    console.log("see results");
  });
//----------------------------------------------------------------------------------------------------------------------//
});
