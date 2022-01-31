var apiKey = "95ce3e162e0116e8f93a9e96b347dad9"
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchInput = document.querySelector("#city-search-input");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");

var getWeatherUpdate = function(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
   fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            displayCurrent(data, city)
        })
    });
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if(city) {
        getWeatherUpdate(city);
        getOverview(city);
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
    
        uvIndexEl.appendChild(uvIndexValue);
    
        //append index to current weather
        weatherContainerEl.appendChild(uvIndexEl);
    }

    var getOverview = function(city){

        var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    
        fetch(apiURL)
        .then(function(response){
            response.json().then(function(data){
               display5Day(data);
            });
        });
    };
    
    var display5Day = function(weather){
        forecastContainerEl.textContent = ""
        forecastTitle.textContent = "5 Day Forecast:";
    
        var forecast = weather.list;
            for(var i=5; i < forecast.length; i=i+8){
           var dailyForecast = forecast[i];
            
           
           var forecastEl=document.createElement("div");
           forecastEl.classList = "card bg-primary text-light m-2";
    
           //console.log(dailyForecast)
    
           //create date element
           var forecastDate = document.createElement("h5")
           forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
           forecastDate.classList = "card-header text-center"
           forecastEl.appendChild(forecastDate);
    
           
           //create an image element
           var weatherIcon = document.createElement("img")
           weatherIcon.classList = "card-body text-center";
           weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
    
           //append to forecast card
           forecastEl.appendChild(weatherIcon);
           
           //create temperature span
           var forecastTempEl=document.createElement("span");
           forecastTempEl.classList = "card-body text-center";
           forecastTempEl.textContent = dailyForecast.main.temp + " °F";
    
            //append to forecast card
            forecastEl.appendChild(forecastTempEl);
    
           var forecastHumEl=document.createElement("span");
           forecastHumEl.classList = "card-body text-center";
           forecastHumEl.textContent = dailyForecast.main.humidity + "  %";
    
           //append to forecast card
           forecastEl.appendChild(forecastHumEl);
    
            // console.log(forecastEl);
           //append to five day container
            forecastContainerEl.appendChild(forecastEl);
        }
    
    }
    

cityFormEl.addEventListener("submit", formSubmitHandler);