<script lang="ts">
    import { goto } from '$app/navigation';
    import type { ActionData, PageData } from './$types';
    import { formatDateForInput } from '$lib/utils/dateUtils';
    import EventForm from '$lib/components/EventForm.svelte';
    import BackButton from '$lib/components/BackButton.svelte';

    interface Props {
        data: PageData;
        form: ActionData | null;
    }

    let { data, form }: Props = $props();
    
    const backLinkDestination = `/${data.event.id}`;
    const backLinkText = 'Back to event';
    
    let title = $state(form?.title || data.event.title || '');
    let description = $state(form?.description || data.event.description || '');
    let eventDate = $state(form?.date || data.event.date || '');
    
    $effect(() => {
        const sourceDate = data.event.date;
        if (sourceDate) {
            eventDate = formatDateForInput(sourceDate);
        }
    });

    function handleSuccess(detail: { eventId: number }) {
        goto(`/${detail.eventId}`);
    }
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8 border-b pb-4">
        <h1 class="text-3xl font-bold text-blue-700">Edit Event</h1>
        <p class="text-gray-600 mt-1">Update event details</p>
    </header>
    
    <BackButton href={backLinkDestination} label={backLinkText} />
    
    <EventForm
        {title}
        {description}
        date={eventDate}
        formError={form?.error}
        submitLabel="Update Event"
        onSuccess={handleSuccess}
    />
</div> 