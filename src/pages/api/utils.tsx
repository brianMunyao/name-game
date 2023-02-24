export const capitalize = (str: string) => {
	return str.replace(/\b\w/g, function (l) {
		return l.toUpperCase();
	});
};
