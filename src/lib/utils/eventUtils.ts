import type { Event } from '$lib/server/remote-events';
import { formatMonthYear } from './dateUtils';

export function organizeEvents(events: Event[]) {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const sortedEvents = [...events].sort((a, b) => {
		return new Date(a.date).getTime() - new Date(b.date).getTime();
	});

	const todaysEvents = sortedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		const eventDay = new Date(eventDate);
		eventDay.setHours(0, 0, 0, 0);
		return eventDay.getTime() === today.getTime();
	});

	const upcomingEvents = sortedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		const eventDay = new Date(eventDate);
		eventDay.setHours(0, 0, 0, 0);
		return eventDay.getTime() > today.getTime();
	});

	const groupedUpcoming = upcomingEvents.reduce(
		(acc, event) => {
			const eventDate = new Date(event.date);
			const monthYear = formatMonthYear(eventDate);

			if (!acc[monthYear]) {
				acc[monthYear] = [];
			}

			acc[monthYear].push(event);
			return acc;
		},
		{} as Record<string, Event[]>
	);

	return {
		todaysEvents,
		groupedUpcoming
	};
}
