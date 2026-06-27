const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");

const error = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        getWeather();
    }
});

async function getWeather(){

    const city = cityInput.value.trim();

    if(city===""){
        error.textContent="Please enter a city name.";
        weatherCard.classList.add("hidden");
        return;
    }

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response=await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data=await response.json();

        cityName.textContent=data.name;

        temperature.textContent=data.main.temp;

        humidity.textContent=data.main.humidity;

        wind.textContent=data.wind.speed;

        description.textContent=data.weather[0].description;

        weatherCard.classList.remove("hidden");

        error.textContent="";

    }
    catch(err){

        weatherCard.classList.add("hidden");

        error.textContent=err.message;

    }

}
