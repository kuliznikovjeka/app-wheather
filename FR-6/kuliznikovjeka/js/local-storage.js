function setterStorage(locations) {
	localStorage.setItem('favourite-location', JSON.stringify(...[locations]));
}

function getLocationFromStorage() {
	return JSON.parse(localStorage.getItem('favourite-location')) || [];
}

function setLastCity(lastCity) {
	localStorage.setItem('lastCity', lastCity);
}

function getLastCity() {
	return localStorage.getItem('lastCity');
}



export { setterStorage, getLocationFromStorage, setLastCity, getLastCity }