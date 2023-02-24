export const isCountryValid = async (country: string) => {
	const api = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

	try {
		const response = await fetch(api);
		if (!response.ok) {
			if (response.status === 404) {
				return { error: 'Country Invalid' };
			} else {
				return { error: 'Other errors' };
			}
		}
		const res = await response.json();
		return { data: true, res };
	} catch (e) {
		return { error: 'Unhandled errors', e };
	}
};
