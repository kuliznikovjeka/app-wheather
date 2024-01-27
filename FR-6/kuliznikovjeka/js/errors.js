const ERRORS = {
	NOT_FOUND_LOCATION: 'Локация не найдена',
	INVALID_REQUEST: 'Неправильный запрос от пользователя',
	UNAUTHORIZED_REQUEST: 'Неавторизованный запрос от пользователя',
	SERVER_ERROR: 'Ошибка сервера',
}

export function throwError(response) {
	if (response.status === 404) throw new Error(ERRORS.NOT_FOUND_LOCATION);
	if (response.status === 400) throw new Error(ERRORS.INVALID_REQUEST);
	if (response.status === 401) throw new Error(ERRORS.UNAUTHORIZED_REQUEST);
	if (response.status === 500) throw new Error(ERRORS.SERVER_ERROR);
}

