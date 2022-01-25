var apiKey = "95ce3e162e0116e8f93a9e96b347dad9"

var getWeatherUpdate = function(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid="+ apiKey;
   fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            console.log(data)
        })
    });
}
getWeatherUpdate(63,43);