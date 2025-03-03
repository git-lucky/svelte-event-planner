<script lang="ts">
    import EventHeader from './EventHeader.svelte';
    import ActionButtons from './ActionButtons.svelte';
    import EventDescription from './EventDescription.svelte';
    import type { Event } from '$lib/server/remote-events';

    interface Props {
        event: Event;
        isEditLoading?: boolean;
        onEditClick: (eventId: number) => void;
        onDeleteClick: () => void;
    }
    
    let { 
        event, 
        isEditLoading = false,
        onEditClick,
        onDeleteClick
    }: Props = $props();
</script>

<div class="bg-white rounded-lg shadow-md p-6 border">
    <div class="flex justify-between items-start mb-6">
        <EventHeader title={event.title} date={event.date} />
        <ActionButtons 
            eventId={event.id}
            {isEditLoading}
            {onEditClick}
            {onDeleteClick}
        />
    </div>
    
    <EventDescription description={event.description} />
</div>