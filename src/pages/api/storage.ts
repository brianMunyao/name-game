export const saveScore = (score: number) => {
	localStorage.setItem('@score', String(score));
};

export const getScore = () => {
	try {
		const score = localStorage.getItem('@score');
		if (score) {
			return Number(score);
		}
		return 0;
	} catch (e) {
		return 0;
	}
};
