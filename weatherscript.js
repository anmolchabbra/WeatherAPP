document.addEventListener("DOMContentLoaded", () => {
    const apikey = "05d65a163d520f7721e39f38fe80317a";
    const cityEntered = document.getElementById("cityValue");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherInfo = document.getElementById("weatherInfo");
    const weatherCity = weatherInfo.querySelector("h2");
    const weatherDescribe = weatherInfo.querySelector("p");

    getWeatherBtn.addEventListener("click", ()=> {
        const city = cityEntered.value.trim();
        if (city !== "") {
            getWeather(city);
            cityEntered.nodeValue = "";
        }
    });

    async function getWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                showWeather(data);
            } else {
                showError(data.message);
            }
        } catch (error) {
            showError('Error Occurred..Please try again' + error.message);
        }
    }


    function showWeather(data) {
        console.log(data);
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        weatherCity.textContent = data.name;;
        weatherDescribe.textContent = `Weather: ${weatherDescription}, Temperature: ${temperature}°C`;
    }

    function showError(message) {
        weatherInfo.style.display = "none";
        alert(message);
    }

});