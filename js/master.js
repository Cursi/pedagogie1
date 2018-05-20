//----------------------------------------------------------------------------------------------------------------------//
var regionID, postSent;

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
  if(AreFieldsFilled()) $("#sendButton").show(1000);
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

        $.post("./php/insertDescriptions.php", { description: descriptionJSON });
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

    location.reload();
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
    $.post("./php/checkDescription.php", function(descriptionExists)
    {
      if(!parseInt(descriptionExists))
      {
        $("#pageContainer").load("./pages/describe.php", function()
        {
          $(".owl-carousel").owlCarousel(
          {
            autoWidth: true,
            navigation : true
          });
          $(".owl-carousel").hide().show(1000);

          $("#selectedImage").attr("src", $(".thumbnail")[0].src);
          $($(".descriptionInput")[0]).addClass("active");

          $(".thumbnail").click(function()
          {
            $("#selectedImage").attr("src", this.src);

            $(".descriptionInput").not($(".descriptionInput")[this.name]).removeClass("active");
            $($(".descriptionInput")[this.name]).addClass("active");
          });
        });
      }
      else alert("You already sent your descriptions.");
    });
  });

  $(".fa-american-sign-language-interpreting").click(function()
  {
    regionID = 2;
    $.post("./php/checkBigBoy.php", function(bigBoyGaveAccess)
    {
      if(parseInt(bigBoyGaveAccess))
      {
        $.post("./php/checkClassify.php", function(result)
        {
          var classifyExists = (result ? 1 : 0 );

          if(!parseInt(classifyExists))
          {
            $("#pageContainer").load("./pages/classify.php", function()
            {
              $(".owl-carousel").owlCarousel(
              {
                autoWidth: true,
                navigation : true
              });
              $(".owl-carousel").hide().show(500);

              for(let i=0; i<$(".thumbnail").length; i++)
              {
                $("#pageContainer").append('<div id="listContainer' + i + '" class="classifyContainer"></div>');
              }

              $(".thumbnail").click(function()
              {
                var imageURL = this.src;
                var imageID = this.name;

                $(".classifyContainer").not($(".classifyContainer")[this.name]).removeClass("active");
                $($(".classifyContainer")[imageID]).addClass("active");

                if ($("#listContainer" + imageID).is(":empty") && !postSent)
                {
                  postSent = true;

                  $.post("./php/getDescriptions.php", { imageURL: imageURL }, function(json)
                  {
                    postSent = false;

                    json = JSON.parse(json);
                    json.sort(function() { return 0.5 - Math.random() });
                    console.log(json);
                    
                    for(let i=0; i<json.length; i++)
                    {
                      $("#listContainer" + imageID).append(
                        '<label class="label">' + json[i]["description"] +
                        '<input type="radio" name="' + imageURL + '" label="' + json[i].isAI + '">' +
                        '<span class="checkmark"></span>' +
                        '</label>');
                    }
                  });
                }
              });
            });
          }
          else alert("You already classified descriptions.");
        });
      }
      else alert("You were not granted access yet.");
    });
  });

  $(".fa-chart-pie").click(function()
  {
    console.log("see results");
  });
//----------------------------------------------------------------------------------------------------------------------//
});
