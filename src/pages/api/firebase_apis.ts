import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from 'firebase/database';

const app = initializeApp({
	apiKey: 'AIzaSyBbE7n6u-OtoezXzcylcMatHJm4Mti6oK4',
	authDomain: 'name-game-91e1d.firebaseapp.com',
	databaseURL:
		'https://name-game-91e1d-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'name-game-91e1d',
	storageBucket: 'name-game-91e1d.appspot.com',
	messagingSenderId: '737585017718',
	appId: '1:737585017718:web:6a3aa5399b0b6814ecc057',
	measurementId: 'G-RH23WX0YWN',
});
const db = getDatabase(app);

export const writeFeedback = async (subject: string, message: string) => {
	try {
		const dbRef = ref(db, '/feedback');

		const res = await push(dbRef, {
			subject,
			message,
			date: Date.now(),
		});
		return res.key;
	} catch (e) {
		return false;
	}
};
