var apiKey = "95ce3e162e0116e8f93a9e96b347dad9"
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchInput = document.querySelector("#city-search-input");
var futureTitle = document.querySelector("#future");
var futureContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var cities = [];

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
        getFuture(city);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
};

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
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

    //create an image element
    var weatherIcon = document.createElement("img")
     weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
     citySearchInput.appendChild(weatherIcon);

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

    var getFuture = function(city){

        var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    
        fetch(apiURL)
        .then(function(response){
            response.json().then(function(data){
               displayFuture(data);
            });
        });
    };
    
    var displayFuture = function(weather){
        futureContainerEl.textContent = ""
        futureTitle.textContent = "5 Day Forecast:";
    
        var future = weather.list;
            for(var i=5; i < future.length; i=i+8){
           var dailyFuture = future[i];
            
           var futureEl = document.createElement("div");
           futureEl.classList = "card bg-primary text-light m-2";
    
           //create date element
           var futureDate = document.createElement("h5")
           futureDate.textContent= moment.unix(dailyFuture.dt).format("MMM D, YYYY");
           futureDate.classList = "card-header text-center"
           futureEl.appendChild(futureDate);
    
           //create an image element
           var weatherIcon = document.createElement("img")
           weatherIcon.classList = "card-body text-center";
           weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyFuture.weather[0].icon}@2x.png`);  
           futureEl.appendChild(weatherIcon);
           
           // temperature data
           var futureTempEl=document.createElement("span");
           futureTempEl.classList = "card-body text-center";
           futureTempEl.textContent = dailyFuture.main.temp + " °F";
            futureEl.appendChild(futureTempEl);
    
           var futureHumEl=document.createElement("span");
           futureHumEl.classList = "card-body text-center";
           futureHumEl.textContent = dailyFuture.main.humidity + "  %";
           futureEl.appendChild(futureHumEl);
    
            futureContainerEl.appendChild(futureEl);
        }
    
    }
    var pastSearch = function(pastSearch){
 
        // console.log(pastSearch)
    
        var pastSearchEl = document.createElement("button");
        pastSearchEl.textContent = pastSearch;
        pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
        pastSearchEl.setAttribute("data-city",pastSearch)
        pastSearchEl.setAttribute("type", "submit");
    
        pastSearchButtonEl.prepend(pastSearchEl);
    }
    
    
    var pastSearchHandler = function(event){
        var city = event.target.getAttribute("data-city")
        if(city){
            getWeatherUpdate(city);
            getFuture(city);
        }
    }
    
saveSearch();
cityFormEl.addEventListener("submit", formSubmitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);