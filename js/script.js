import { ELEMENTS } from "./ui-elements.js";

ELEMENTS.FORM.addEventListener("submit", defineLocation);

function defineLocation(e) {
	e.preventDefault();
	const inputValue = ELEMENTS.SEARCH_INPUT.value;

	const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
	const cityName = inputValue;
	const apiKey = 'c6a1e5e92f42e2b324df2c5a7dae3eb0&units=metric';
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

	fetch(url).then(response => {
		throwError(response)
		return response.json()
	})
		.then(data => {
			const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
			ELEMENTS.DEGREES.textContent = Math.round(data.main['temp']) + ELEMENTS.DEGREES_CELSIUS;
			ELEMENTS.ICON_WHEATHER.firstElementChild.src = iconUrl;
			changeLocation();
		})
		.catch(error => {
			alert(error)
		})
		.finally(() => resetInput(ELEMENTS.SEARCH_INPUT));
}

function throwError(response) {
	if (response.status === 404) throw new Error('Локация не найдена');
	if (response.status === 400) throw new Error('Неправильный запрос от клиента');
	if (response.status === 401) throw new Error('Неавторизованный запрос от клиента');
	if (response.status === 500) throw new Error('Ошибка сервера');
}

function changeLocation() {
	ELEMENTS.CURRENT_LOCATION.textContent = ELEMENTS.SEARCH_INPUT.value;
}

function resetInput(input) {
	const emptyValue = '';
	input.value = emptyValue;
}

