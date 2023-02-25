export const capitalize = (str: string) => {
	return str.replace(/\b\w/g, function (l) {
		return l.toUpperCase();
	});
};

export const formatTime = (seconds: number) => {
	let minutes = Math.floor(seconds / 60);
	let remainingSeconds = seconds % 60;
	return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
		.toString()
		.padStart(2, '0')}`;
};
