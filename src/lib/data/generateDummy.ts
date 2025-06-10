export function generateDateRange(start: Date, end: Date): string[] {
	const dates = [];
	let current = new Date(start);

	while (current <= end) {
		dates.push(new Date(current).toISOString());
		current.setDate(current.getDate() + 1);
	}

	return dates;
}

export function generateRandomValues(length: number, min: number, max: number): number[] {
	return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}
