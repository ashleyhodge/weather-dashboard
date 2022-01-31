var apiKey = "95ce3e162e0116e8f93a9e96b347dad9"
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchInput = document.querySelector("#city-search-input")


var getWeatherUpdate = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+ apiKey;
   fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            displayCurrent(data, cityName)
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

var displayCurrent = function(weather, searchInput) {
//clear old content
    weatherContainerEl.textContent = "";
    citySearchInput.textContent = searchInput;

    console.log(weather)
    console.log(searchInput)
    // get current date
    var currentDate = document.createElement("span")
    currentDate.textContent = " on " + moment(weather.dt.value).format("MMM D, YYYY");
    citySearchInput.appendChild(currentDate);
    console.log(currentDate); 

    // get temp data
    var tempEl = document.createElement("span")
    tempEl.textContent = "Tempature: " + weather.main.temp + " °F"
    tempEl.classList = "list-group-item"
    weatherContainerEl.appendChild(tempEl)

    // get wind data
    var windEl = document.createElement('span')
    windEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH"
    windEl.classList = "list-group-item"
    weatherContainerEl.appendChild(windEl)

    // get humidity data 
    var humidityEl = document.createElement('span')
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %"
    humidityEl.classList = "list-group-item"
    weatherContainerEl.appendChild(humidityEl)

    // get UV Index data from function created below
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat,lon);
}
//function for finding UV Index data
var getUvIndex = function(lat,lon){
        var apiURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
        fetch(apiURL)
        .then(function(response){
            response.json().then(function(data){
                displayUvIndex(data)
                console.log(data)
            });
        });  
    }

    var displayUvIndex = function(index){
        var uvIndexEl = document.createElement("div");
        uvIndexEl.textContent = "UV Index: "
        uvIndexEl.classList = "list-group-item"
    
        uvIndexValue = document.createElement("span")
        uvIndexValue.textContent = index.value
    
        if(index.value <=2){
            uvIndexValue.classList = "favorable"
        }else if(index.value >2 && index.value<=8){
            uvIndexValue.classList = "moderate "
        }
        else if(index.value >8){
            uvIndexValue.classList = "severe"
        };
    
        uvIndexEl.appendChild(uvIndexValue);
    
        //append index to current weather
        weatherContainerEl.appendChild(uvIndexEl);
    }
cityFormEl.addEventListener("submit", formSubmitHandler);