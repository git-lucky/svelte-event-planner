import { fetchEventById, updateEventById } from '$lib/server/remote-events';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = parseInt(params.eventId);
	const event = await fetchEventById(eventId);

	if (!event) {
		redirect(302, '/');
	}

	return {
		event
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const eventId = parseInt(params.eventId);
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

		const eventDate = new Date(date);
		const now = new Date();

		if (eventDate < now) {
			return fail(400, {
				error: 'Event date cannot be in the past',
				title,
				description,
				date
			});
		}

		try {
			const updated = await updateEventById(eventId, { title, description, date });

			if (!updated) {
				return fail(404, {
					error: 'Event not found',
					title,
					description,
					date
				});
			}

			return {
				success: true,
				eventId
			};
		} catch (err) {
			console.error('Error updating event:', err);
			return fail(500, {
				error: 'Failed to update event',
				title,
				description,
				date
			});
		}
	}
};
