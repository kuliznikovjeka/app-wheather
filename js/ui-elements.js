const ELEMENTS = {
	FORM: document.querySelector('.weather__form'),
	SEARCH_INPUT: document.querySelector('.weather__input'),
	CURRENT_LOCATION: document.querySelector('.weather__location'),
	DEGREES: document.querySelector('.weather__degrees'),
	ICON_WHEATHER: document.querySelector('.weather__precipitation'),
	WHEATHER_LIST: document.querySelector('.weather__list'),
	WHEATHER_LOCATION: document.querySelector('.weather__location'),
	FAVOURITE_BTN: document.querySelector('.weather__favourite-btn'),
	INFORM_WEATHER_LIST: document.querySelector('.inform-weather__list'),
	WEATHER_FEELS_LIKE: document.querySelector('#feels-like'),
	SUNRISE: document.querySelector('#sunrise'),
	SUNSET: document.querySelector('#sunset'),
	DETAIL_TIME_1: document.querySelector('#detail-time-1'),
	DETAIL_TIMES: document.querySelectorAll('.details-weather__time'),
	DETAIL_TEPUTURE: document.querySelectorAll('.details-weather__temputure'),
	DETAIL_FEELS_LIKE: document.querySelectorAll('.details-weather__feelslike'),
	DETAIL_ICON: document.querySelectorAll('.details-weather__icon'),
}

const VALUES_VARS = {
	DEGREES_CELSIUS: '°',
	TEMPUTURE: 'Температура: ',
	FEELS_LIKE: 'Ощущается как: ',
	SUNRISE: 'Рассвет: ',
	SUNSET: 'Закат: '
}

export { ELEMENTS, VALUES_VARS }