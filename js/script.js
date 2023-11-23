import { ELEMENTS } from "./ui-elements.js";

ELEMENTS.FORM.addEventListener("submit", defineLocation);

function defineLocation(e) {
	e.preventDefault();
	const inputValue = ELEMENTS.SEARCH_INPUT.value;

	const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
	const cityName = inputValue;
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f&units=metric'; // этот ключ имеет ограничение в кол-ве запросов, если будут ошибки - придется сгенерировать новый или спросить в чате
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

	fetch(url).then(response => response.json())
		.then(data => {
			const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png`;
			ELEMENTS.DEGREES.textContent = Math.round(data.main['temp']) + ELEMENTS.DEGREES_CELSIUS;
			ELEMENTS.ICON_WHEATHER.firstElementChild.src = iconUrl;
		});

	changeLocation()
	resetInput(ELEMENTS.SEARCH_INPUT);
}

function changeLocation() {
	ELEMENTS.CURRENT_LOCATION.textContent = ELEMENTS.SEARCH_INPUT.value;
}

function resetInput(input) {
	const emptyValue = '';
	input.value = emptyValue;
}