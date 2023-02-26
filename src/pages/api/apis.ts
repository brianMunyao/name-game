import { countries } from './data';

export const isCountryValid = (country: string) => {
	const index = countries.findIndex(
		(val) => val.toLowerCase() === country.toLowerCase()
	);

	if (index !== -1) return { data: countries[index] };

	return { error: 'Not a country' };
};

export const isAnimalValid = async (animal: string) => {
	if (animal === '') return { error: 'Not an animal' };

	const api = `https://api.api-ninjas.com/v1/animals?name=${animal}`;

	const requestHeaders: HeadersInit = new Headers();
	requestHeaders.set(
		'X-Api-Key',
		process.env.NEXT_PUBLIC_API_NINJAS_API_KEY || ''
	);

	try {
		let response = await fetch(api, { headers: requestHeaders });

		if (!response.ok) {
			return { error: 'Other Errors' };
		}

		const responseData = await response.json();

		const filtered = responseData.filter(
			(anim: any) => anim.name.toLowerCase() === animal.toLowerCase()
		);

		if (filtered.length > 0) {
			return { data: filtered[0].name };
		}
		return { error: 'Not an animal' };
	} catch (e) {
		return { error: 'Unhandled errors' };
	}
};

// import sendgrid from '@sendgrid/mail';
// sendgrid.setApiKey(process.env.NEXT_PUBLIC_SEND_GRID_API_KEY || '');

// export const sendMail = async (text: string) => {
// 	const msg = {
// 		to: 'brianmunyao6@gmail.com', // Change to your recipient
// 		from: 'brianmunyao6@gmail.com', // Change to your verified sender
// 		subject: 'Sending with SendGrid is Fun',
// 		text: 'and easy to do anywhere, even with Node.js',
// 		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// 	};

// 	try {
// 		const res = await sendgrid.send(msg);

// 		return res;
// 	} catch (e) {
// 		return e;
// 	}
// };
