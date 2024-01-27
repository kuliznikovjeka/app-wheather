import { buildElement } from './build-element.js';
import { ELEMENTS, VALUES_VARS } from './ui-elements.js';
import { DATA_API } from './data-api.js';
import { setterStorage, getLocationFromStorage, setLastCity, getLastCity } from './local-storage.js';
import { throwError } from './errors.js';

ELEMENTS.FORM.addEventListener('submit', getDataLocation);
ELEMENTS.FORM.addEventListener('submit', getDataWeatherDetails);
ELEMENTS.FAVOURITE_BTN.addEventListener('click', addFavouriteLocation);
ELEMENTS.WHEATHER_LIST.addEventListener('click', deleteLocation);
ELEMENTS.WHEATHER_LIST.addEventListener('click', chooseLocation);

window.addEventListener('load', function (e) {
	const lastCity = getLastCity();
	if (lastCity) {
		ELEMENTS.SEARCH_INPUT.value = lastCity;
		getDataLocation(e);
		getDataWeatherDetails(e);
	}
});

// const listLocations = ['Ялта', 'Воркута', 'Москва', 'Нижний Новгород'];
const listLocations = new Set(getLocationFromStorage());
console.log(listLocations);

render(listLocations)

function render(listLocations) {
	ELEMENTS.WHEATHER_LIST.replaceChildren();

	listLocations.forEach(location => {
		const li = buildElement('li', 'weather__favoutite-location');
		const p = buildElement('p', 'weather__location-name', location);
		const btn = buildElement('button', 'weather__remove-btn');
		li.append(p, btn);
		ELEMENTS.WHEATHER_LIST.append(li);
	});

}

async function defineLocation(e) {
	e.preventDefault();
	const inputValue = ELEMENTS.SEARCH_INPUT.value.trim();
	const cityName = inputValue;
	const url = `${DATA_API.serverUrl}?q=${cityName}&appid=${DATA_API.apiKey}`;
	setLastCity(cityName);

	const response = await fetch(url);
	throwError(response);
	return await response.json();
}

async function getDataLocation(e) {
	try {
		const data = await defineLocation(e);
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
	} catch (error) {
		alert(error);
	} finally {
		resetInput(ELEMENTS.SEARCH_INPUT);
	}
}

async function defineWeatherDetails(e) {
	e.preventDefault();
	const inputValue = ELEMENTS.SEARCH_INPUT.value.trim();
	const cityName = inputValue;

	const url = `${DATA_API.forecastServerUrl}?q=${cityName}&appid=${DATA_API.apiKey}`;

	const response = await fetch(url);
	throwError(response);
	return await response.json();

}

async function getDataWeatherDetails(e) {

	try {
		const data = await defineWeatherDetails(e);

		const showTemputure = (elements, temputureName, value) => {
			elements.forEach((elemName, i) => {
				elemName.textContent = temputureName + Math.round(data.list[i].main[value]) + VALUES_VARS.DEGREES_CELSIUS;
			})
		}

		showTemputure(ELEMENTS.DETAIL_TEPUTURE, VALUES_VARS.TEMPUTURE, 'temp');
		showTemputure(ELEMENTS.DETAIL_FEELS_LIKE, VALUES_VARS.FEELS_LIKE, 'feels_like');

		ELEMENTS.DETAIL_TIMES.forEach((time, i) => {
			time.textContent = data.list[i].dt_txt.slice(0, 16);
		});

		ELEMENTS.DETAIL_ICON.forEach((iconWeather, i) => {
			iconWeather.firstElementChild.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}@2x.png`;
		})

	} catch (error) {
		alert(error)
	}
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

	listLocations.add(location);
	setterStorage(Array.from(listLocations))
	render(Array.from(listLocations));
}

function deleteLocation(e) {
	if (!e.target.classList.contains('weather__remove-btn')) return;

	const locationName = e.target.previousElementSibling.textContent;
	listLocations.delete(locationName);

	setterStorage(Array.from(listLocations))
	render(Array.from(listLocations));
}

function chooseLocation(e) {
	if (!e.target.classList.contains('weather__location-name')) return;

	const targetValue = e.target.textContent;
	ELEMENTS.SEARCH_INPUT.value = targetValue;
	getDataLocation(e);
	getDataWeatherDetails(e);
}


