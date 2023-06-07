var searchBtnEl = $(".btn-search")
var cityNameEl = $("#city-name")
var currentTempEl = $("#current-temp")
var currentWindEl = $("#current-wind")
var currentHumidityEl = $("#current-humidity")
var forecastConditionEl = $("#forecast-condition")
var forecastTempEl = $("#forecast-temp")
var forecastWindEl = $("#forecast-wind")
var forecastHumidityEl = $("#forecast-humidity")
var currentWeatherImageEl = $("#current-weather-image")


var latitude = ''
var longitute = ''
var userInput = ''

function getLatLon() {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&appid=1e00e3c0b8a5dd6f2f19e02a5f455336")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            latitude = data[0].lat
            longitute = data[0].lon
            weatherInfo()
        })
}

function weatherInfo() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitute + "&units=imperial&appid=1e00e3c0b8a5dd6f2f19e02a5f455336")
        .then(function(response){
            return response.json()
        })
        //writes data out to screen
        .then(function(data){
            console.log(data)
            cityNameEl.text(data.city.name)
            currentWeatherImageEl.attr("src", 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png')
            currentTempEl.text('Temp: ' + data.list[0].main.temp)
            currentWindEl.text('Wind: ' + data.list[0].wind.deg + '° @ ' + data.list[0].wind.speed + ' MPH')
            currentHumidityEl.text('Humidity: ' + data.list[0].main.humidity + '%')
            var index = 0
            for (i = 7; i < 40; i+=8){
                console.log(i)
                console.log(data.list[i].dt_txt)

                $("#forecast-condition" + index).attr("src", 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png')
                $("#forecast-temp" + index).text('Temp: ' + data.list[i].main.temp)
                $("#forecast-wind" + index).text('Wind: ' + data.list[i].wind.deg + '° @ ' + data.list[i].wind.speed + ' MPH')
                $("#forecast-humidity" + index).text('Humidity: ' + data.list[i].main.humidity + '%')


                index++
            }
        })
}

searchBtnEl.on('click', function(){
    userInput = $("input").val()
    getLatLon()
})