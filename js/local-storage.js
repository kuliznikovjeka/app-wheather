function setterStorage(locations) {
	localStorage.setItem('location', JSON.stringify(locations));

}

function getLocationFromStorage() {
	return JSON.parse(localStorage.getItem('location')) || [];
}

export { setterStorage, getLocationFromStorage }