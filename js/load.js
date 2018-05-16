pathURL = "./data/";

var fileExtensions = [".png", ".jpg", ".gif", ".JPG"];

$.ajax(
  {
    url: pathURL,
    success: function (data)
    {
       $(data).find("a:contains(" + fileExtensions[0] + "),a:contains(" + fileExtensions[1] + "),a:contains(" + fileExtensions[2] + ")").each(function ()
       {
           var filename = this.href.replace(window.location.host, "").replace("http:///", "");
           console.log(filename);
       });
    }
  });
