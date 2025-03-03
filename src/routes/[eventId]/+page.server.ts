import { deleteEventById, fetchEventById } from '$lib/server/remote-events';
import type { Actions, PageServerLoad } from './$types';
import { error, type ActionResult } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends(`event:${params.eventId}`);

	const eventId = parseInt(params.eventId);
	const event = await fetchEventById(eventId);

	if (!event) {
		throw error(404, 'Event not found');
	}

	return {
		event
	};
};

export const actions: Actions = {
	delete: async ({ params }): Promise<ActionResult> => {
		const eventId = parseInt(params.eventId);

		try {
			const success = await deleteEventById(eventId);

			if (!success) {
				throw error(404, 'Event not found');
			}

			return { type: 'success', status: 200 };
		} catch (err) {
			console.error('Error deleting event:', err);
			throw error(500, 'Failed to delete event');
		}
	}
};
