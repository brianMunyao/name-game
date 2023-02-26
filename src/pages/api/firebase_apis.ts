import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from 'firebase/database';

const app = initializeApp({
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
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
