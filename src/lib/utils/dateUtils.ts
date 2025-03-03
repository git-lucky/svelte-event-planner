export function formatMonthYear(date: Date): string {
	return date.toLocaleDateString(undefined, {
		month: 'long',
		year: 'numeric'
	});
}

export function formatTime(date: string): string {
	const eventDate = new Date(date);
	return eventDate.toLocaleTimeString(undefined, {
		hour: 'numeric',
		minute: '2-digit'
	});
}

export function getDayOfWeek(date: Date): string {
	return date.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase();
}

export function getDayNumber(date: Date): number {
	return date.getDate();
}

export function formatFullDate(dateString: string): string {
	return new Date(dateString).toLocaleString(undefined, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function formatDateForInput(dateString: string): string {
	const date = new Date(dateString);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getTodayForInput(): string {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}T00:00`;
}

export function validateEventDate(dateString: string): string {
	const selectedDate = new Date(dateString);
	const now = new Date();

	return selectedDate < now ? 'Event date cannot be in the past' : '';
}
