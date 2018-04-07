// ------ MessageBird (chat) API ----------

//var apiKey = "live_6HTXgyC6hGaiDa5NnAhcCJumO"
//var chatURL = 


// ------ IP-API ----------

var queryURL = "https://ip-api.com/json";
var p1Location;
var p2Location;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
      //console.log(response);
      p1Location = $('#p1-city').text(response.city + ", " + response.country);
      p2Location = $('#p2-city').text(response.city + ", " + response.country);
      
  }) 

