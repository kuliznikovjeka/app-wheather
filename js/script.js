import { ELEMENTS } from './ui-elements.js';

ELEMENTS.FORM.addEventListener('submit', defineLocation);
ELEMENTS.FAVOURITE_BTN.addEventListener('click', addFavouriteLocation);
ELEMENTS.WHEATHER_LIST.addEventListener('click', deleteLocation);
ELEMENTS.WHEATHER_LIST.addEventListener('click', chooseLocation);


const listLocations = ['Ялта', 'Воркута'];

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

render(listLocations);


function defineLocation(e) {
	e.preventDefault();
	// const favouriteLocation = chooseLocation();
	const inputValue = ELEMENTS.SEARCH_INPUT.value.trim();

	const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
	const cityName = inputValue;
	const apiKey = 'c6a1e5e92f42e2b324df2c5a7dae3eb0&units=metric';
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

	fetch(url).then(response => {
		throwError(response)
		return response.json()
	})
		.then(data => {
			const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}@4x.png`;
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
	if (response.status === 400) throw new Error('Неправильный запрос от пользователя');
	if (response.status === 401) throw new Error('Неавторизованный запрос от пользователя');
	if (response.status === 500) throw new Error('Ошибка сервера');
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
	render(listLocations);
}

function deleteLocation(e) {
	if (!e.target.classList.contains('weather__remove-btn')) return;

	const oneElement = 1;
	const locationName = e.target.previousElementSibling;
	const elementPosition = listLocations.indexOf(locationName.textContent);
	listLocations.splice(elementPosition, oneElement);

	render(listLocations);
}

function chooseLocation(e) {
	if (!e.target.classList.contains('weather__location-name')) return;

	const targetValue = e.target.textContent;
	return ELEMENTS.SEARCH_INPUT.value = targetValue;
}

function buildElement(tagName, className, text) {
	const tag = document.createElement(tagName);
	tag.classList.add(className);
	tag.textContent = text;
	return tag
}

