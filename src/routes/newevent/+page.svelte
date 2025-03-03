<script lang="ts">
    import { goto } from '$app/navigation';
    import type { ActionData } from './$types';
    import EventForm from '$lib/components/EventForm.svelte';
    import BackButton from '$lib/components/BackButton.svelte';

    interface Props {
        form: ActionData | null;
    }

    let { form }: Props = $props();
    
    let title = $state(form?.title || '');
    let description = $state(form?.description || '');
    let eventDate = $state(form?.date || '');

    function handleSuccess(detail: { eventId: number }) {
        goto(`/${detail.eventId}`);
    }
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8 border-b pb-4">
        <h1 class="text-3xl font-bold text-blue-700">Create New Event</h1>
        <p class="text-gray-600 mt-1">Add a new event to your calendar</p>
    </header>
    
    <BackButton href="/" label="Back to events" />
    
    <EventForm
        {title}
        {description}
        date={eventDate}
        formError={form?.error}
        submitLabel="Create Event"
        onSuccess={handleSuccess}
    />
</div>