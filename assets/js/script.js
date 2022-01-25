var getWeatherUpdate = function() {
    var response = fetch("https://api.openweathermap.org/data/2.5/onecall?lat=41.4&lon=2.17&appid=95ce3e162e0116e8f93a9e96b347dad9").then(function(response){
        console.log("inside",response)
    });
    console.log("outside");
}
getWeatherUpdate();