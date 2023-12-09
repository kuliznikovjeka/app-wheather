import { buildElement } from './build-element.js';
import { ELEMENTS, VALUES_VARS } from './ui-elements.js';
import { DATA_API } from './data-api.js';
import { setterStorage, getLocationFromStorage, setLastCity, getLastCity } from './local-storage.js';
import { throwError } from './errors.js';

ELEMENTS.FORM.addEventListener('submit', defineLocation);
ELEMENTS.FORM.addEventListener('submit', defineWeatherDetails);
ELEMENTS.FAVOURITE_BTN.addEventListener('click', addFavouriteLocation);
ELEMENTS.WHEATHER_LIST.addEventListener('click', deleteLocation);
ELEMENTS.WHEATHER_LIST.addEventListener('click', chooseLocation);

window.addEventListener('load', function (e) {
	const lastCity = getLastCity();
	if (lastCity) {
		ELEMENTS.SEARCH_INPUT.value = lastCity;
		defineLocation(e);
		defineWeatherDetails(e);
	}
});

// const listLocations = ['Ялта', 'Воркута', 'Москва', 'Нижний Новгород'];
const listLocations = getLocationFromStorage();

render(listLocations)

function render(listLocations) {
	ELEMENTS.WHEATHER_LIST.replaceChildren();

	for (let i = 0; i < listLocations.length; i++) {
		const li = buildElement('li', 'weather__favoutite-location');
		const p = buildElement('p', 'weather__location-name', listLocations[i]);
		const btn = buildElement('button', 'weather__remove-btn');
		li.append(p, btn);
		ELEMENTS.WHEATHER_LIST.append(li);
	}

}

function defineLocation(e) {
	e.preventDefault();
	const inputValue = ELEMENTS.SEARCH_INPUT.value.trim();
	const cityName = inputValue;
	const url = `${DATA_API.serverUrl}?q=${cityName}&appid=${DATA_API.apiKey}`;
	setLastCity(cityName);

	fetch(url).then(response => {
		throwError(response)
		return response.json()
	})
		.then(data => {
			const degrees = Math.round(data.main['temp']) + VALUES_VARS.DEGREES_CELSIUS;
			const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png`;
			const feelsLike = VALUES_VARS.FEELS_LIKE + Math.round(data.main['feels_like']) + VALUES_VARS.DEGREES_CELSIUS;

			const sunriseHours = String(new Date(data.sys['sunrise'] * 1000).getHours()).padStart(2, '0');
			const sunriseMinutes = String(new Date(data.sys['sunrise'] * 1000).getMinutes()).padStart(2, '0');

			const sunsetHours = String(new Date(data.sys['sunset'] * 1000).getHours()).padStart(2, '0');
			const sunsetMinutes = String(new Date(data.sys['sunset'] * 1000).getMinutes()).padStart(2, '0');

			const sunrise = VALUES_VARS.SUNRISE + sunriseHours + ':' + sunriseMinutes;
			const sunset = VALUES_VARS.SUNSET + sunsetHours + ':' + sunsetMinutes;

			ELEMENTS.DEGREES.textContent = degrees;
			ELEMENTS.ICON_WHEATHER.firstElementChild.src = iconUrl;
			ELEMENTS.WEATHER_FEELS_LIKE.textContent = feelsLike;
			ELEMENTS.SUNRISE.textContent = sunrise;
			ELEMENTS.SUNSET.textContent = sunset;
			changeLocation();
		})
		.catch(error => {
			alert(error)
		})
		.finally(() => resetInput(ELEMENTS.SEARCH_INPUT));
}

function defineWeatherDetails(e) {
	e.preventDefault();
	const inputValue = ELEMENTS.SEARCH_INPUT.value.trim();
	const cityName = inputValue;

	const url = `${DATA_API.forecastServerUrl}?q=${cityName}&appid=${DATA_API.apiKey}`;

	fetch(url).then(response => response.json())

		.then(data => {

			ELEMENTS.DETAIL_TIMES.forEach((time, i) => {
				time.textContent = data.list[i].dt_txt.slice(0, 16);
			});

			ELEMENTS.DETAIL_TEPUTURE.forEach((temputure, i) => {
				temputure.textContent = VALUES_VARS.TEMPUTURE + Math.round(data.list[i].main['temp']) + VALUES_VARS.DEGREES_CELSIUS;
			})

			ELEMENTS.DETAIL_FEELS_LIKE.forEach((temputure, i) => {
				temputure.textContent = VALUES_VARS.FEELS_LIKE + Math.round(data.list[i].main['feels_like']) + VALUES_VARS.DEGREES_CELSIUS;
			})

			ELEMENTS.DETAIL_ICON.forEach((iconWeather, i) => {
				iconWeather.firstElementChild.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}@2x.png`;
			})

		})
}

function changeLocation() {
	let inputValue = ELEMENTS.SEARCH_INPUT.value.toLowerCase();
	inputValue = inputValue[0].toUpperCase() + inputValue.slice(1);

	ELEMENTS.CURRENT_LOCATION.textContent = inputValue;
}

function resetInput(input) {
	const emptyValue = '';
	input.value = emptyValue;
}

function addFavouriteLocation(location) {
	location = ELEMENTS.WHEATHER_LOCATION.textContent;
	if (listLocations.includes(location)) return;

	listLocations.push(location);
	setterStorage(listLocations)
	render(listLocations);
}

function deleteLocation(e) {
	if (!e.target.classList.contains('weather__remove-btn')) return;

	const oneElement = 1;
	const locationName = e.target.previousElementSibling;
	const elementPosition = listLocations.indexOf(locationName.textContent);
	listLocations.splice(elementPosition, oneElement);

	setterStorage(listLocations)
	render(listLocations);
}

function chooseLocation(e) {
	if (!e.target.classList.contains('weather__location-name')) return;

	const targetValue = e.target.textContent;
	ELEMENTS.SEARCH_INPUT.value = targetValue;
	defineLocation(e);
	defineWeatherDetails(e);
}


