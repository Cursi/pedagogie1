//----------------------------------------------------------------------------------------------------------------------//
var regionID
var postSent;
var classifyPercentage;

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
    default: break;
  }

  return JSON.stringify(json);
}

function CheckFields()
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
      var numberOfPhotosClassified = 0;
      classifyPercentage = 0;

      $(".classifyContainer").each(function()
      {
        $(this).find("input:radio").each(function()
        {
          if(this.checked)
          {
            numberOfPhotosClassified++;
            if(parseInt($(this).attr("label"))) classifyPercentage++;
          }
        });
      });

      classifyPercentage = classifyPercentage / $(".thumbnail").length * 100;
      if(numberOfPhotosClassified != $(".thumbnail").length) areFieldsFilled = 0;
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
    if(isUserConnected == 0)
    {
      $(".uiElement").off();
      $("#loginWrapper").addClass("active");
    }
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
        $.post("./php/insertResults.php", { result: classifyPercentage });
        break;
      }
      default: break;
    }

    location.reload();
  });
//----------------------------------------------------------------------------------------------------------------------//
  $(".fa-home").click(function()
  {
    if(regionID != 0)
    {
      regionID = 0;
      $("#pageContainer").load("./pages/about.php",);
    }
  });

  $(".fa-eye").click(function()
  {
    if(regionID != 1)
    {
      $.post("./php/checkDescription.php", function(descriptionExists)
      {
        if(!parseInt(descriptionExists))
        {
          regionID = 1;

          $("#pageContainer").load("./pages/describe.php", function()
          {
            $(".owl-carousel").owlCarousel(
            {
              autoWidth: true,
              navigation : true
            });
            $(".owl-carousel").hide().show(500);

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
    }
  });

  $(".fa-american-sign-language-interpreting").click(function()
  {
    if(regionID != 2)
    {
      $.post("./php/checkBigBoy.php", function(bigBoyGaveAccess)
      {
        if(parseInt(bigBoyGaveAccess))
        {
          $.post("./php/checkClassify.php", function(result)
          {
            var classifyExists = (result ? 1 : 0 );

            if(!parseInt(classifyExists))
            {
              regionID = 2;

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

                        for(let i=0; i<json.length; i++)
                        {
                          $("#listContainer" + imageID).append(
                            '<label class="label">' + json[i]["description"] +
                            '<input oninput="CheckFields();" type="radio" name="' + imageURL + '" label="' + json[i].isAI + '">' +
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
    }
  });

  $(".fa-chart-pie").click(function()
  {
    if(regionID != 3)
    {
      $.post("./php/checkBigBoy.php", function(bigBoyGaveAccess)
      {
        if(parseInt(bigBoyGaveAccess))
        {
          $.post("./php/checkResults.php", function(resultsExist)
          {
            if(parseInt(resultsExist))
            {
              regionID = 3;

              $("#pageContainer").load("./pages/results.php", function()
              {
                $.post("./php/getResults.php", function(results)
                {
                  json = JSON.parse(results);
                  var labels = [], series = [];
                  var averageResult = 0;

                  for(let i=0; i< json.length; i++)
                  {
                    labels.push(json[i]["username"]);

                    averageResult += parseInt(json[i]["result"]);
                    series.push(json[i]["result"]);
                  }

                  new Chartist.Bar('.ct-chart',
                  {
                    labels: labels,
                    series: [ series ]
                  },
                  {
                    seriesBarDistance: 10,
                    reverseData: true,
                    horizontalBars: true,
                    axisX: { type: Chartist.AutoScaleAxis },
                    axisY: { offset: 50 }
                  });

                  averageResult /= series.length;
                  $("#averagePercentage").text(Math.round(averageResult) + "%");
                });
              });
            }
            else alert("Not all of the descriptions were classified.");
          });
        }
        else alert("You were not granted access yet.");
      });
    }
  });
//----------------------------------------------------------------------------------------------------------------------//
});
