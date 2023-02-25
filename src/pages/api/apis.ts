import { countries } from './data';

export const isCountryValid = (country: string) => {
	// const api = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

	const res = countries.filter(
		(val) => country.toLowerCase() === val.toLowerCase()
	);

	if (res.length > 0) {
		return { data: res[0] };
	}
	return { error: 'Not a country' };

	// try {
	// 	const response = await fetch(api);
	// 	if (!response.ok) {
	// 		if (response.status === 404) {
	// 			return { error: 'Country Invalid' };
	// 		} else {
	// 			return { error: 'Other errors' };
	// 		}
	// 	}
	// 	const res = await response.json();
	// 	return { data: true, res };
	// } catch (e) {
	// 	return { error: 'Unhandled errors', e };
	// }
};

export const isAnimalValid = async (animal: string) => {
	const api = `https://api.api-ninjas.com/v1/animals?name=${animal}`;

	try {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set(
			'X-Api-Key',
			'JmuV951xID3roAlguWieDw==e2swOXeUBVSHwLXA'
		);

		let response = await fetch(api, { headers: requestHeaders });

		if (!response.ok) {
			return { error: 'Other Errors' };
		}

		response = await response.json();

		const filtered = response.filter(
			(anim) => anim.name.toLowerCase() === animal.toLowerCase()
		);

		if (filtered.length > 0) {
			return { data: filtered[0].name };
		}
		return { error: 'Not an animal' };
	} catch (e) {
		return { error: 'Unhandled errors' };
	}
};
