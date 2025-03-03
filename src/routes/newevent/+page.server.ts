import { createEvent } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { validateEventDate } from '$lib/utils/dateUtils';

export const actions: Actions = {
	default: async ({ request }) => {
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();

		if (!title || !date) {
			return fail(400, {
				error: 'Title and Date are required',
				title,
				description,
				date
			});
		}

		const dateError = validateEventDate(date);
		if (dateError) {
			return fail(400, {
				error: dateError,
				title,
				description,
				date
			});
		}

		try {
			const newEvent = await createEvent({ title, description, date });
			return {
				success: true,
				eventId: newEvent.id
			};
		} catch (err) {
			console.error('Error creating event:', err);
			return fail(500, {
				error: 'Failed to create event',
				title,
				description,
				date
			});
		}
	}
};
