var apiKey = "95ce3e162e0116e8f93a9e96b347dad9"
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");


var getWeatherUpdate = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+ apiKey;
   fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            console.log(data)
        })
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if(city) {
        getWeatherUpdate(city);
        cityInputEl.value = "";
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);