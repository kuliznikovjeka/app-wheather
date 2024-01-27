// // function getMainActorProfileFromMovie(id) {
// // 	return fetch(`https://swapi.dev/api/films/${id}/`)
// // 		.then((movieResponse) => {
// // 			return movieResponse.json()
// // 		})
// // 		.then((movie) => {
// // 			const characterUrl = movie.characters[0].split("//")[1]
// // 			return fetch(`https://${characterUrl}`)
// // 		})
// // 		.then((characterResponse) => {
// // 			return characterResponse.json()
// // 		})
// // 		.catch((err) => {
// // 			console.error("Произошла ошибка!", err)
// // 		})
// // }

// // getMainActorProfileFromMovie(1).then((profile) => {
// // 	console.log(profile)
// // })


// async function getMainActorProfileFromMovie(id) {
// 	try {
// 		const responseMovie = await fetch(`https://swapi.dev/api/films/${id}/`);
// 		const textResponse = await responseMovie.json();

// 		const characterUrl = movie.characters[0].split("//")[1];
// 		const responseCharacter = await fetch(`https://${characterUrl}`);
// 		return responseCharacter.json();
// 	} catch (err) {
// 		console.error('Произошла ошибка ', err);
// 	}
// }

// getMainActorProfileFromMovie(1).then((profile) => { console.log(profile) });

