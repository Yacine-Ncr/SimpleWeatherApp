/** @format */
const apiKey = "94b9d77f085cf1e020f78f651760efcf";
const apiUrl =
	"https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const btn = document.querySelector(".btn");
const searchBox = document.querySelector("#input");
const info = document.querySelector(".weather-info");
const weatherIcon = document.querySelector("#weatherIcon");
console.log(weatherIcon);

async function getWeather(city) {
	const result = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

	if (result.status == 404) {
		info.style.display = "none";
		document.querySelector(".error").style.display = "block";
	} else {
		info.style.display = "block";
		document.querySelector(".error").style.display = "none";
		let wData = await result.json();
		console.log(wData);
		document.querySelector(".temperature").innerHTML =
			Math.round(wData.main.temp) + "°C";
		document.querySelector(".city-name").innerHTML = wData.name;
		document.querySelector("#humidity").innerHTML = wData.main.humidity + "%";
		document.querySelector("#speed").innerHTML = wData.wind.speed + " km/h";
		if (wData.weather[0].main == "Clear") {
			weatherIcon.src = "images/clear.png";
			// weatherIcon.setAttribute('src', "images/clear.png" )
		} else if (wData.weather[0].main == "Clouds") {
			weatherIcon.src = "images/clouds.png";
		} else if (wData.weather[0].main == "Drizzle") {
			weatherIcon.src = "images/drizzle.png";
		} else if (wData.weather[0].main == "Mist") {
			weatherIcon.src = "images/mist.png";
		} else if (wData.weather[0].main == "Snow") {
			weatherIcon.src = "images/snow.png";
		}
	}
}

btn.addEventListener("click", () => {
	getWeather(searchBox.value);
	searchBox.value = "";
});
